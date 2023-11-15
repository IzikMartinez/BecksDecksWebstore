import {describe, it, expect, test} from '@jest/globals';

describe('dotenv loads SUPABASE_URL', ()=> {
  it('should display the supabase url', ()=> {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY
    expect(supabaseUrl).toBeDefined()
    expect(supabaseKey).toBeDefined()
    console.log('SUPABASE_URL:', supabaseUrl, "\nKEY:", supabaseKey)
  })
})
