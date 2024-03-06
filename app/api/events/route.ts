import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server"
import { Database, EventType } from "@/types";
import { randomUUID } from "crypto";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
    let { data: EVENTS, error } = await supabase
      .from('EVENTS')
      .select('*')
    if(error) {
      return NextResponse.json({ error: error}, { status:500 })
    }
    return NextResponse.json({EVENTS}, { status: 200})
}

export async function POST(request: Request) {
  const { event_name, event_fee, event_time, event_category, event_description }: Partial<EventType> = await request.json()

  if(event_name && event_fee && event_time && event_category && event_description) {
    const { data, error } = await supabase
      .from('EVENTS')
      .insert([
        { 
          event_id: randomUUID(),
          event_name: event_name,
          event_fee: event_fee,
          event_time: event_time,
          event_category: event_category,
          event_description: event_description
        }])
      .select()
    if(error) return NextResponse.json({ error: error },{ status:500})
    return NextResponse.json({}, {status:200})
  }
  else return NextResponse.json({ error: 'request body is blank'},{ status:500})
}
