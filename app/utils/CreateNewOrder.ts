interface OrderParams {
    orderTotal: number;
    stateOrder: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
    };
    cart: any;  // Assuming cart has any type, replace it with the actual type.
}

export function createNewOrder(params: OrderParams) {
    const {orderTotal, stateOrder, cart} = params;
    const {firstName, lastName, email, phone} = stateOrder;

    const currentTime: Date = new Date();
    const createdOrder = {
        created_at: currentTime.toISOString(),
        order_total: orderTotal,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone,
        items: JSON.stringify(cart),
    };

    return createdOrder;
};