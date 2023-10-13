import { supabase } from "../utils/supabase";
import {describe, it, expect, test} from '@jest/globals';

describe('Supabase test SELECT', () => {

    it('should return a list of products', async ()=> {

    const { data: PRODUCTS, error } = await supabase
    .from('PRODUCTS')
    .select('id') 

    console.log(PRODUCTS)
    expect(PRODUCTS?.length).toBeGreaterThan(0)

}) })