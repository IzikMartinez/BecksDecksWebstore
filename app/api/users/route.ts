import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server"
import { Database, UserType } from "@/types";
import { randomUUID } from "crypto";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey)



export async function GET() {
    let { data: USERS, error } = await supabase
      .from('USERS')
      .select('*')
    if(error) {
      return NextResponse.json({ error: error}, { status:500 })
    }
    return NextResponse.json({USERS}, { status: 200})
}

export async function POST(request: Request) {
  const { player_id, player_lastname, player_firstname}: Partial<UserType> = await request.json()
  if( player_id && player_lastname && player_firstname  ) {
    const { data, error } = await supabase
      .from('USERS')
      .insert([
        { 
          player_firstname: player_firstname,
          player_lastname: player_lastname,
          player_id: player_id,
        }])
      .select()
    if(error) return NextResponse.json({ error: error },{ status:500})
    return NextResponse.json({"message": "Successfully posted new user", user_id: player_id}, {status:200})
  }
  else return NextResponse.json({ error: 'request body is blank'},{ status:500})
}
