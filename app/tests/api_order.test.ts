import {describe, it, expect } from '@jest/globals';
import {Json, OrderTypeInsert} from "@/types";

type OrderInsert = {
    created_at?: string
    email?: string | null
    first_name?: string | null
    items?: Json | null
    last_name?: string | null
    order_no?: number
    order_total?: number | null
    phone?: string | null
}

describe('We want to use fetch to call Supabase data from our backend', () => {
    it('should create an order using /api/order API', async () => {
        const orderData: OrderInsert = {
            created_at: '2023-04-18',
            email: 'john.doe@example.com',
            first_name: 'John',
            items: { item1: 'Test Item 1', item2: 'Test Item 2' },
            last_name: 'Doe',
            order_no: 1001,
            order_total: 500.25,
            phone: '123-456-7890'
        };

        const res = await fetch("http://localhost:3000/api/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })

        const data = await res.json();
        console.log(data);
    })
})