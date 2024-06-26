import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";
import { Database, ProductType } from "@/types"

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function GET(request: Request) {
      const { data: PRODUCTS, error } = await supabase
        .from('PRODUCTS')
        .select('*')
      if(error) {
          console.error("Failed to fetch products: ", error)
          return NextResponse.json({ error: error},{ status: 500 })
      }
      return NextResponse.json({PRODUCTS}, {status: 200})
}

