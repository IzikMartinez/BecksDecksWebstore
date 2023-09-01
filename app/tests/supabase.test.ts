import { log } from "console";
import { supabase } from "../utils/supabase";
import {describe, expect, test} from '@jest/globals';

test('test if Supabase is working', async () => {

    const { data: Events, error } = await supabase
    .from('Events')
    .select('*') 

    console.log(Events)

})