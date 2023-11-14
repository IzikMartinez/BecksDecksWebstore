import { createClient } from "@supabase/supabase-js";
import { Database, EventType, ProductType } from "../types/supabase";

const supabaseUrl = 'https://vlormrdjyqfcebbwsmfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsb3JtcmRqeXFmY2ViYndzbWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5MTk5OTYsImV4cCI6MTk5OTQ5NTk5Nn0.wnMt_x756myUr_kXfYF07xOWwQ74otyl--R2NiPQMDg';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)


export async function FetchProducts() {
    const { data: PRODUCTS, error } = await supabase.from('PRODUCTS').select('*')
    if(error) {
        console.error("Failed to fetch products: ", error)
    }
    return PRODUCTS as ProductType[]
}

export async function FetchEvents() {
    const { data: EVENTS, error } = await supabase.from('EVENTS').select('*')
    if(error) {
        console.error("Failed to fetch events: ", error)
    }
    return EVENTS as EventType[]
}

async function insertUser() {
}
