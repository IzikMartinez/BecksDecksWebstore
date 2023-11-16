
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server"
import { Database, EntrantType } from "@/types";
import { randomUUID } from "crypto";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
    let { data: ENTRANTS, error } = await supabase
      .from('ENTRANTS')
      .select('*')
    if(error) {
      return NextResponse.json({ error: error}, { status:500 })
    }
    console.log("FETCHED ENTRANTS:", ENTRANTS)
    return NextResponse.json({ENTRANTS}, { status: 200})
}

export async function POST(request: Request) {
  const { event_id, player_id }: Partial<EntrantType> = await request.json()
  const user_id = randomUUID()
  if( player_id && event_id ) {
    const { data, error } = await supabase
      .from('ENTRANTS')
      .insert([
        { 
          event_id: event_id,
          player_id: player_id
        }])
      .select()
    if(error) return NextResponse.json({ error: error },{ status:500})
    return NextResponse.json({user_id: user_id}, {status:200})
  }
  else return NextResponse.json({ error: 'request body is blank'},{ status:500})
}
