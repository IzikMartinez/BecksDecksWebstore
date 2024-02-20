// Importing the necessary modules and types
import {NextRequest, NextResponse} from "next/server";
import { createClient } from "@supabase/supabase-js";
import {Database, OrderType, OrderTypeInsert} from "@/types";

// Setting up the Supabase client with the necessary keys and URL
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Defining the async function POST to handle POST requests
export async function POST(req: NextRequest) {
    // Using the Redux hook useDispatch
    // Extracting keys from the incoming request body
    const {order_no, email, first_name, last_name, order_total,items}: Partial<OrderTypeInsert> = await req.json();
    // Check if all necessary data is present
    if(order_no && email && first_name && last_name) {
    // Attempt to insert the new order into the ORDERS table
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
    // Check if an error occurred during the insertion
    if (error) {
      // If error, return an error message and a 500 status code
      return NextResponse.json({
          body: order_no, first_name, last_name, email, order_total, items,
          error: `Insertion unsuccessful ${error.message}`
      }, {status: 500})
    } else {
      // If no errors occurred, clear the Redux cart and return a success message and a 200 status code
        return NextResponse.json({
            body: {order_no, first_name, last_name, email, order_total, items,
            message: "Inserted successfully"
        }},
        {status: 200})
    }

    }
    // If necessary data is missing from the request, return an error message, the request info, and a 500 status code
    else return NextResponse.json({error: 'request body is blank or missing information', req}, {status:500})
}