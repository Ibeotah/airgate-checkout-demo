export interface PaymentData {
  amount: number;
  currency: string;
  callback_url: string;
  user: {
    name: string;
    email: string;
  };
  customer_transaction_ref: string;
}

export interface ApiError {
  message: string;
  [key: string]: any;
}
