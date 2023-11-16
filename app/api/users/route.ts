import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server"
import { Database, UserType } from "@/types";
import { randomUUID } from "crypto";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
    let { data: USERS, error } = await supabase
      .from('USERS')
      .select('*')
    if(error) {
      return NextResponse.json({ error: error}, { status:500 })
    }
    console.log("FETCHED USERS:", USERS)
    return NextResponse.json({USERS}, { status: 200})
}

export async function POST(request: Request) {
  const { player_id, player_lastname, player_firstname, game }: Partial<UserType> = await request.json()
  const user_id = randomUUID()
  if( player_id && player_lastname && player_firstname && game ) {
    const { data, error } = await supabase
      .from('USERS')
      .insert([
        { 
          user_id: user_id,
          player_firstname: player_firstname,
          player_lastname: player_lastname,
          player_id: player_id,
          game: game,
        }])
      .select()
    if(error) return NextResponse.json({ error: error },{ status:500})
    return NextResponse.json({user_id: user_id}, {status:200})
  }
  else return NextResponse.json({ error: 'request body is blank'},{ status:500})
}
