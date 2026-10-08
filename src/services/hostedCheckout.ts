import {
  hostedCheckoutBaseUrl,
  secretKey,
  merchantKey,
} from "../constants/constants";
import type { PaymentData } from "../types/index"
import type { ApiError } from "../types/index";

const paymentInitiateHostedEndpoint = "payment_initiate_hosted";

export async function hostedCheckout(paymentData: PaymentData) {
  try {
    const url = `${hostedCheckoutBaseUrl}/${paymentInitiateHostedEndpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Secret-Key": secretKey,
        "Merchant-Key": merchantKey,
      },
      body: JSON.stringify(paymentData),
    });

    const jsonData = await response.json();

    if (!response.ok) {
      const apiError = jsonData as ApiError;
      const error = new Error(apiError.message || "Unknown error");
      (error as unknown as { data: ApiError }).data = apiError;
      throw error;
    }
    return jsonData;
  } catch (error) {
    throw error;
  }
}