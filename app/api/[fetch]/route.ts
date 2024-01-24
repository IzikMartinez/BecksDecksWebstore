const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
import { createClient } from "@supabase/supabase-js";
import { Database, ProductType } from "@/types"
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// write a function that fetches all public image urls from supabase storage bucket
// the bucket is called "product_images"
// the image type is always .jpg
// use NextJS NextResponse object to return the image urls as a JSON object
export async function GET(request: Request, { params }: { params: { fetch: string } }) {
  // this file is a dynamic NextJS route. We will retrieve the image ID as params in the url.
  const imageID = params.fetch
  const data = supabase.storage
    .from("product_images")
    .getPublicUrl(`${imageID}.jpg`)
  if (data === null) {
    return NextResponse.json({ error: "No images found" }, { status: 404 })
  }
  console.log(data)
  return NextResponse.json(data, { status: 200 })
}


