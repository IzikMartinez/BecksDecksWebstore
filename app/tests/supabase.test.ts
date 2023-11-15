import { supabase } from "../utils/supabase";
import {describe, it, expect, test} from '@jest/globals';

describe('Supabase test SELECT', () => {

    it('should return a list of products', async ()=> {

    const { data: EVENTS, error } = await supabase
    .from('EVENTS')
    .select('*') 

    console.log(EVENTS)
    //expect(EVENTS).toBeGreaterThan(0)

}) })
