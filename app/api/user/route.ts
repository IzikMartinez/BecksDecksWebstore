import { Database, UserType } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey)


export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    //const { player_id, player_lastname, player_firstname }: Partial<UserType> = await request.json()
    let { data: USERS, error } = await supabase
      .from('USERS')
      .select('*')
      .eq('player_id', id)
    if(error) {
      return NextResponse.json({ error: error}, { status:500 })
    }
    return NextResponse.json({USERS}, { status: 200})
    return NextResponse.json({message: id},{status:200})
}

export async function POST(request: NextRequest) {
  const {player_id, player_firstname, player_lastname}: UserType = await request.json()

  let { data: USERS, error } = await supabase
      .from('USERS')
      .select('*')
      .eq('player_id', player_id)
  if(USERS?.length) return NextResponse.json({message: "Player already exists in database", user: USERS}, {status: 200})
  else {
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
    return NextResponse.json({message: "Successfully posted new user", user_id: player_id}, {status:200})
     }
  }
}