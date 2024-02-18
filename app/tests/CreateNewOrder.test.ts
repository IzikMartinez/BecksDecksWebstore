import {createNewOrder} from "../utils/CreateNewOrder";
import {describe, it, expect, test} from '@jest/globals';
import { render, screen } from '@testing-library/react';

interface OrderParams {
    orderNo: number;
    orderTotal: number;
    stateOrder: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
    };
    cart: any;  // Assuming cart has any type, replace it with the actual type.
}

describe('createNewOrder function test', () => {
  it('should return correct order output', async () => {
    // Create test data
    const testData: OrderParams = {
        orderNo: 12345,
        orderTotal: 789.65,
        stateOrder: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@test.com',
            phone: '1234567890'
        },
        cart: { /* Test cart data goes here */ }
    }

    const result = await createNewOrder(testData);

    expect(result).not.toBeNull();
  console.log(result)
  });
});