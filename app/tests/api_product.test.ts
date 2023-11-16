import {describe, it, expect } from '@jest/globals';

describe('We want to use fetch to call Supabase data from our backend', ()=> {
  it('should display a list of products', async ()=> {
    const res = await fetch("http://localhost:3000/api/products", {
method: "GET",
    })
    const data = await res.json()
    expect(data).toBeDefined
    const { PRODUCTS: productArray} = data
    console.log(productArray)
  })
})
