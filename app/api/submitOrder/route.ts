// This is a Next.js API route.
// Upon receiving a POST request, it will generate a unique order number and create a new order in the database with the order number, the user's email, and their full name.
// The email and full name are sent in the request body.

import { NextRequest } from "next/server";

type OrderType = {
  orderNumber: string;
  email: string;
  fullName: string;
};

export async function POST(req: NextRequest, res: Response) {
  const { email, fullName }: Partial<OrderType> = await req.json();
  /*
  const { email, fullName } = req.body;
  const orderNumber = generateOrderNumber();
  const order = new Order(orderNumber, email, fullName);
  await order.save();
  res.status(200).json({ orderNumber });
  */
}
