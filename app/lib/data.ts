/* ------------------------------------------------------------------ */
/*  lib/data.ts                                                       */
/* ------------------------------------------------------------------ */
'use server';

import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { supabase } from './supabaseClient';

/* --------------------------- helpers ------------------------------ */

function logDbError(e: any, where: string) {
  try {
    console.error(`⛔ DB Error at ${where}:`, JSON.stringify(e, null, 2));
  } catch {
    console.error(`⛔ DB Error at ${where}:`, e);
  }
}

const isNumberLike = (s: string) => /^-?\d+(\.\d+)?$/.test(s);
const isISODate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

const ITEMS_PER_PAGE = 6;

function mapInvoices(rows: any[]): InvoicesTable[] {
  return rows.map((r) => ({
    id: r.id,
    customer_id: r.customers.id,
    name: r.customers.name,
    email: r.customers.email,
    image_url: r.customers.image_url,
    date: r.date,
    amount: r.amount,
    status: r.status,
  }));
}

/* --------------------------- REVENUE ------------------------------ */

export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    await new Promise((r) => setTimeout(r, 3000)); // demo delay
    const { data, error } = await supabase.from('revenue').select('*');
    if (error) throw error;
    return data as Revenue[];
  } catch (e) {
    logDbError(e, 'fetchRevenue');
    throw new Error('Failed to fetch revenue data.');
  }
}

/* ---------------------- LATEST 5 INVOICES ------------------------- */

export async function fetchLatestInvoices() {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select(
        `
          id,
          amount,
          customers!inner(id, name, email, image_url)
        `,
      )
      .order('date', { ascending: false })
      .limit(5);

    if (error) throw error;

    return data.map((row: any) => ({
      id: row.id,
      name: row.customers.name,
      image_url: row.customers.image_url,
      email: row.customers.email,
      amount: formatCurrency(row.amount),
    }));
  } catch (e) {
    logDbError(e, 'fetchLatestInvoices');
    throw new Error('Failed to fetch the latest invoices.');
  }
}

/* -------------------------- DASHBOARD CARDS ----------------------- */

export async function fetchCardData() {
  try {
    const [
      invoiceCount,
      customerCount,
      paidInvoices,
      pendingInvoices,
    ] = await Promise.all([
      supabase.from('invoices').select('*', { count: 'exact', head: true }),
      supabase.from('customers').select('*', { count: 'exact', head: true }),
      supabase.from('invoices').select('amount').eq('status', 'paid'),
      supabase.from('invoices').select('amount').eq('status', 'pending'),
    ]);

    if (invoiceCount.error) throw invoiceCount.error;
    if (customerCount.error) throw customerCount.error;
    if (paidInvoices.error) throw paidInvoices.error;
    if (pendingInvoices.error) throw pendingInvoices.error;

    const totalPaid = (paidInvoices.data ?? []).reduce(
      (s, i: any) => s + i.amount,
      0,
    );
    const totalPending = (pendingInvoices.data ?? []).reduce(
      (s, i: any) => s + i.amount,
      0,
    );

    return {
      numberOfInvoices: invoiceCount.count || 0,
      numberOfCustomers: customerCount.count || 0,
      totalPaidInvoices: formatCurrency(totalPaid),
      totalPendingInvoices: formatCurrency(totalPending),
    };
  } catch (e) {
    logDbError(e, 'fetchCardData');
    throw new Error('Failed to fetch card data.');
  }
}

/* ---------------------- FILTERED INVOICES ------------------------- */

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
): Promise<InvoicesTable[]> {
  const q = query.trim();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    /* ---------- 1. без фильтра ---------- */
    if (!q) {
      const { data, error } = await supabase
        .from('invoices')
        .select(
          `
            id, amount, date, status,
            customers!inner(id, name, email, image_url)
          `,
        )
        .order('date', { ascending: false })
        .range(offset, offset + ITEMS_PER_PAGE - 1);

      if (error) throw error;
      return mapInvoices(data ?? []);
    }

    /* ---------- 2. поиск клиентов ---------- */
    const { data: cust, error: custErr } = await supabase
      .from('customers')
      .select('id')
      .or(`name.ilike.*${q}*,email.ilike.*${q}*`);
    if (custErr) throw custErr;

    const customerIds = (cust ?? []).map((c) => c.id as string);
    const inFilter =
      customerIds.length > 0
        ? `customer_id.in.(${customerIds.join(',')})`
        : null;

    /* ---------- 3. собираем OR-фильтр ---------- */
    const parts: string[] = [];

    if (isNumberLike(q)) parts.push(`amount.eq.${Number(q)}`);
    parts.push(`status.ilike.*${q}*`);
    if (isISODate(q)) parts.push(`date.eq.${q}`);
    if (inFilter) parts.push(inFilter);

    const orFilter = parts.join(',');

    /* ---------- 4. запрос ---------- */
    const { data, error } = await supabase
      .from('invoices')
      .select(
        `
          id, amount, date, status,
          customers!inner(id, name, email, image_url)
        `,
      )
      .or(orFilter)
      .order('date', { ascending: false })
      .range(offset, offset + ITEMS_PER_PAGE - 1);

    if (error) throw error;
    return mapInvoices(data ?? []);
  } catch (e) {
    logDbError(e, 'fetchFilteredInvoices');
    throw new Error('Failed to fetch invoices.');
  }
}

/* -------------------- ПОДСЧЁТ СТРАНИЦ ----------------------------- */

export async function fetchInvoicesPages(query: string) {
  const q = query.trim();

  try {
    if (!q) {
      const { count, error } = await supabase
        .from('invoices')
        .select('id', { count: 'exact', head: true });
      if (error) throw error;
      return Math.ceil((count || 0) / ITEMS_PER_PAGE);
    }

    const { data: cust, error: custErr } = await supabase
      .from('customers')
      .select('id')
      .or(`name.ilike.*${q}*,email.ilike.*${q}*`);
    if (custErr) throw custErr;

    const customerIds = (cust ?? []).map((c) => c.id as string);
    const inFilter =
      customerIds.length > 0
        ? `customer_id.in.(${customerIds.join(',')})`
        : null;

    const parts: string[] = [];
    if (isNumberLike(q)) parts.push(`amount.eq.${Number(q)}`);
    parts.push(`status.ilike.*${q}*`);
    if (isISODate(q)) parts.push(`date.eq.${q}`);
    if (inFilter) parts.push(inFilter);

    const orFilter = parts.join(',');

    const { count, error } = await supabase
      .from('invoices')
      .select('id', { count: 'exact', head: true })
      .or(orFilter);

    if (error) throw error;
    return Math.ceil((count || 0) / ITEMS_PER_PAGE);
  } catch (e) {
    logDbError(e, 'fetchInvoicesPages');
    throw new Error('Failed to fetch total number of invoices.');
  }
}

/* --------------------------- ONE INVOICE ------------------------- */

export async function fetchInvoiceById(id: string): Promise<InvoiceForm> {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('id, customer_id, amount, status')
      .eq('id', id)
      .single();
    if (error) throw error;
    return { ...data, amount: data.amount / 100 } as InvoiceForm;
  } catch (e) {
    logDbError(e, 'fetchInvoiceById');
    throw new Error('Failed to fetch invoice.');
  }
}

/* -------------------------- CUSTOMERS ---------------------------- */

export async function fetchCustomers(): Promise<CustomerField[]> {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('id, name')
      .order('name', { ascending: true });
    if (error) throw error;
    return data as CustomerField[];
  } catch (e) {
    logDbError(e, 'fetchCustomers');
    throw new Error('Failed to fetch all customers.');
  }
}

/* ------------------- FILTERED CUSTOMERS TABLE -------------------- */

export async function fetchFilteredCustomers(
  query: string,
): Promise<CustomersTableType[]> {
  const q = query.trim();

  try {
    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('id, name, email, image_url')
      .or(q ? `name.ilike.*${q}*,email.ilike.*${q}*` : '')
      .order('name', { ascending: true });
    if (customersError) throw customersError;

    const enriched = await Promise.all(
      (customers ?? []).map(async (customer) => {
        const { data: invoices, error: invoicesError } = await supabase
          .from('invoices')
          .select('amount, status')
          .eq('customer_id', customer.id);
        if (invoicesError) throw invoicesError;

        const total_invoices = (invoices ?? []).length;
        const total_pending = (invoices ?? [])
          .filter((i: any) => i.status === 'pending')
          .reduce((s: number, i: any) => s + i.amount, 0);
        const total_paid = (invoices ?? [])
          .filter((i: any) => i.status === 'paid')
          .reduce((s: number, i: any) => s + i.amount, 0);

        return {
          ...customer,
          total_invoices,
          total_pending: formatCurrency(total_pending),
          total_paid: formatCurrency(total_paid),
        };
      }),
    );

    // Исправлено: теперь total_pending и total_paid возвращаются как числа, а не строки
    return enriched.map((customer: any) => ({
      ...customer,
      total_pending: Number(
        String(customer.total_pending).replace(/[^0-9.-]+/g, '')
      ),
      total_paid: Number(
        String(customer.total_paid).replace(/[^0-9.-]+/g, '')
      ),
    })) as CustomersTableType[];
  } catch (e) {
    logDbError(e, 'fetchFilteredCustomers');
    throw new Error('Не удалось получить таблицу клиентов.');
  }
}

