import { supabase } from '@/app/lib/supabaseClient';

async function listInvoices() {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      amount,
      customers(name)
    `)
    .eq('amount', 666);

  if (error) {
    throw error;
  }

  return data;
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    return Response.json(invoices);
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}

