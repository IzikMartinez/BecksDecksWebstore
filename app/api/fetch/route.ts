const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
import { createClient } from "@supabase/supabase-js";
import { Database, ProductType } from "@/types"
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// write a function that fetches image urls from supabase storage bucket
// the bucket is called "product_images"
// the image name is the product id
// the image type is always .jpg
// use NextJS NextRequest object to get the product id from the request
// use NextJS NextResponse object to return the image url
export async function GET(request: NextRequest) {
  const { productId } = await request.json()
  const PRODUCT_IMAGES = supabase
    .storage
    .from('product_images')
    .getPublicUrl(`${productId}.jpg`)
  if(PRODUCT_IMAGES.data === null) {
    console.error(`Failed to fetch product image: ${productId}.jpg`)
    return NextResponse.json({ error: "Failed to fetch product image" }, { status: 500 })
  }
  return NextResponse.json({PRODUCT_IMAGES}, {status: 200})
}
