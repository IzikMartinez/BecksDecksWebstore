import { createClient } from "@supabase/supabase-js";
import { Database, EventType, ProductType } from "../types/supabase";

export async function FetchProducts() {
    const { data: PRODUCTS, error } = await supabase
      .from('PRODUCTS')
      .select('*')
    if(error) {
        console.error("Failed to fetch products: ", error)
    }
    return PRODUCTS as ProductType[]
}


