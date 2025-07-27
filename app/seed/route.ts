import bcrypt from 'bcrypt';
import { supabase } from '../lib/supabaseClient';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

async function seedUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const { data, error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: hashedPassword
        }, { onConflict: 'id' });
      
      if (error) throw error;
      return data;
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {
  const insertedInvoices = await Promise.all(
    invoices.map(async (invoice) => {
      const { data, error } = await supabase
        .from('invoices')
        .upsert({
          customer_id: invoice.customer_id,
          amount: invoice.amount,
          status: invoice.status,
          date: invoice.date
        }, { onConflict: 'id' });
      
      if (error) throw error;
      return data;
    }),
  );

  return insertedInvoices;
}

async function seedCustomers() {
  const insertedCustomers = await Promise.all(
    customers.map(async (customer) => {
      const { data, error } = await supabase
        .from('customers')
        .upsert({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          image_url: customer.image_url
        }, { onConflict: 'id' });
      
      if (error) throw error;
      return data;
    }),
  );

  return insertedCustomers;
}

async function seedRevenue() {
  const insertedRevenue = await Promise.all(
    revenue.map(async (rev) => {
      const { data, error } = await supabase
        .from('revenue')
        .upsert({
          month: rev.month,
          revenue: rev.revenue
        }, { onConflict: 'month' });
      
      if (error) throw error;
      return data;
    }),
  );

  return insertedRevenue;
}

export async function GET() {
  try {
    await Promise.all([
      seedUsers(),
      seedCustomers(),
      seedInvoices(),
      seedRevenue(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
