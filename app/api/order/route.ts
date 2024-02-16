// This is a Next.js API route.
// Upon receiving a POST request, it will generate a unique order number and create a new order in the database with the order number, the user's email, and their full name.
// The email and full name are sent in the request body.

import {NextRequest, NextResponse} from "next/server";
import { createClient } from "@supabase/supabase-js";
import {Database, OrderType, OrderTypeInsert} from "@/types";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey)


export async function POST(req: NextRequest) {
  const {order_no, email, first_name, last_name, order_total,items}: Partial<OrderTypeInsert> = await req.json();
  if(order_no && email && first_name && last_name) {
      const {data, error} = await supabase
          .from('ORDERS')
          .insert([
              {
                  order_no: order_no,
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  order_total: order_total,
                  items: items,
              }
          ])
          .select()
      if (error) return NextResponse.json({error: `Insertion unsuccessful ${error.message}`}, {status: 500})
      else return NextResponse.json({message: "Inserted successfully"}, {status: 200})
  }
  else return NextResponse.json({error: 'request body is blank or missing a required field'}, {status:500})
  return NextResponse.json({req})
  /*
    await order.save();
  res.status(200).json({ orderNumber });
  */
}
