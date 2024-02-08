// This is a Next.js API route.
// Upon receiving a POST request, it will generate a unique order number and create a new order in the database with the order number, the user's email, and their full name.
// The email and full name are sent in the request body.

import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {Database} from "@/types";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

type OrderType = {
  orderNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export async function POST(req: NextRequest, res: Response) {
  const {orderNumber, email, firstName, lastName, phone }: Partial<OrderType> = await req.json();
  const {data, error} = await supabase
      .from('ORDERS')
      .insert([
        {
          
        }
      ])
  /*
  await order.save();
  res.status(200).json({ orderNumber });
  */
}
