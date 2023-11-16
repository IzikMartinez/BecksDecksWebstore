import { createClient } from "@supabase/supabase-js";
import { Database, EventType, ProductType } from "../types/supabase";

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_KEY as string

console.log("LOG FROM UTILS: KEY", supabaseKey)
console.log("LOG FROM UTILS: URL", supabaseUrl)
export const supabase = createClient<Database>()


export async function FetchProducts() {
    const { data: PRODUCTS, error } = await supabase
      .from('PRODUCTS')
      .select('*')
    if(error) {
        console.error("Failed to fetch products: ", error)
    }
    return PRODUCTS as ProductType[]
}

export async function FetchEvents() {
    let { data: EVENTS, error } = await supabase
      .from('EVENTS')
      .select('*')
    if(error) {
        console.error("Failed to fetch events: ", error)
    }
    console.log("FETCHED EVENTS:", EVENTS)
    return EVENTS as EventType[]
}

export async function insertUser(newUser: Database['public']['Tables']['USERS']['Insert']) {
  const { data, error } = await supabase
  .from('USERS')
  .insert([
    { player_firstname: newUser.player_firstname },
    { player_lastname: newUser.player_lastname },
    { player_id: newUser.player_id },
    { game: newUser.game }
  ])
}
