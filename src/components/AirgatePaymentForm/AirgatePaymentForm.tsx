import { useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import styles from "./AirgatePaymentForm.module.css";
import airgateWhite from "../../assets/airgateLogoWhite.svg";
import { hostedCheckout } from "../../services/hostedCheckout";
import { generateTransactionRef } from "../../utils/generateTransactionRef";
import type { PaymentData, ApiError } from "../../types";
import { NotifyError, NotifySuccess } from "../Notifications/notifications";

export interface AirgatePaymentFormProps {
  onBack?: () => void;
}

export type PaymentOption = "withBill" | "withoutBill";

export interface PaymentFormData {
  billNumber: string;
  paymentReference: string;
  mda: string;
  revenueSubHead: string;
  esbnPid: string;
  phoneNumber: string;
  address: string;
  remark: string;
  amountToPay: string;
  name: string;
  email: string;
}
const initialFormData: PaymentFormData = {
  billNumber: "",
  paymentReference: "R202610053077",
  mda: "",
  revenueSubHead: "",
  esbnPid: "",
  phoneNumber: "",
  address: "",
  remark: "",
  amountToPay: "",
  name: "",
  email: "",
};
export default function AirgatePaymentForm({
  onBack,
}: AirgatePaymentFormProps) {
  const [payOption, setPayOption] = useState<PaymentOption>("withBill");
  const [formData, setFormData] = useState<PaymentFormData>(initialFormData);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFinish = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const paymentData: PaymentData = {
      amount: Number(formData.amountToPay),
      currency: "NGN",
      callback_url: "https://airgate-checkout-demo.vercel.app/",
      user: {
        name: formData.name,
        email: formData.email,
      },
      customer_transaction_ref: generateTransactionRef(),
    };

    try {
      const response = await hostedCheckout(paymentData);
      NotifySuccess(response.message);
      window.open(response.link, "_blank");
    } catch (error) {
      if (error instanceof Error && "data" in error) {
        const apiError = error.data as ApiError;
        NotifyError(apiError.message);
      } else if (error instanceof Error) {
        NotifyError("Payment initiation failed");
      } else {
        NotifyError("An unknown error occurred");
      }
    } finally {
      setFormData(initialFormData);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      const status = searchParams.get("status");

      if (status === "successful") {
        NotifySuccess("Transaction Successful");
      } else if (status === "unsuccessful") {
        NotifyError("Transaction Unsuccessful");
      } else if (status === "cancelled") {
        NotifyError("Transaction Cancelled");
      }
    }
  }, [location.pathname, searchParams]);

  return (
    <main className={styles.pageContainer}>
      <div className={styles.formCard}>
        <header className={styles.formHeader}>
          <button
            type='button'
            className={styles.backButton}
            onClick={onBack}
            aria-label='Go back to Home page'>
            ←
          </button>

          <img alt='Airgate' src={airgateWhite} height={24} />
        </header>

        <div
          className={styles.radioGroup}
          role='radiogroup'
          aria-label='Select Payment Method'>
          <label className={styles.radioLabel}>
            <input
              type='radio'
              name='paymentOption'
              value='withBill'
              checked={payOption === "withBill"}
              onChange={() => setPayOption("withBill")}
            />
            <span className={styles.radioText}>Pay With Bill Number</span>
          </label>

          <label className={styles.radioLabel}>
            <input
              type='radio'
              name='paymentOption'
              value='withoutBill'
              checked={payOption === "withoutBill"}
              onChange={() => setPayOption("withoutBill")}
            />
            <span className={styles.radioText}>Pay Without Bill Number</span>
          </label>
        </div>

        <form className={styles.formBody} onSubmit={handleFinish}>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              {payOption === "withBill" ? (
                <div className={styles.fieldGroup}>
                  <label htmlFor='billNumber'>Bill Number *</label>
                  <input
                    type='text'
                    id='billNumber'
                    name='billNumber'
                    placeholder='Enter bill number'
                    value={formData.billNumber}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className={styles.fieldGroup}>
                  <label htmlFor='paymentReference'>
                    Payment Reference (Please save in case of need to resolve
                    issue on this payment) *
                  </label>
                  <input
                    type='text'
                    id='paymentReference'
                    name='paymentReference'
                    value={formData.paymentReference}
                    onChange={handleChange}
                  />
                </div>
              )}

              {payOption === "withBill" ? (
                <div className={styles.fieldGroup}>
                  <label htmlFor='name'>Name *</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Enter Name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className={styles.fieldGroup}>
                  <label htmlFor='revenueSubHead'>Revenue Sub-Head *</label>
                  <select
                    id='revenueSubHead'
                    name='revenueSubHead'
                    value={formData.revenueSubHead}
                    onChange={handleChange}>
                    <option value=''>-- Select Sub-Head --</option>
                    <option value='direct_assessment'>Direct Assessment</option>
                    <option value='paye'>PAYE</option>
                  </select>
                </div>
              )}
            </div>

            <div className={styles.formRow}>
              {payOption === "withBill" ? (
                <div className={styles.fieldGroup}>
                  <label htmlFor='esbnPid'>ESBN / PID *</label>
                  <input
                    type='text'
                    id='esbnPid'
                    name='esbnPid'
                    placeholder='Enter your ESBN or PID'
                    value={formData.esbnPid}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className={styles.fieldGroup}>
                  <label htmlFor='mda'>MDA *</label>
                  <select
                    id='mda'
                    name='mda'
                    value={formData.mda}
                    onChange={handleChange}>
                    <option value=''>-- Select MDA --</option>
                    <option value='ministry_of_finance'>
                      Ministry of Finance
                    </option>
                    <option value='board_of_internal_revenue'>
                      Board of Internal Revenue
                    </option>
                  </select>
                </div>
              )}

              {payOption === "withBill" ? (
                <div className={styles.fieldGroup}>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Enter email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className={styles.fieldGroup}>
                  <label htmlFor='name'>Name *</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Enter Name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className={styles.formRow}>
              {payOption === "withoutBill" ? (
                <>
                  <div className={styles.fieldGroup}>
                    <label htmlFor='esbnPid'>
                      ESBN/PID (Enter ESBN or PID or Tax Identification Number)
                      *
                    </label>
                    <input
                      type='text'
                      id='esbnPid'
                      name='esbnPid'
                      placeholder='Enter your ESBN or PID'
                      value={formData.esbnPid}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Enter email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.fieldGroup}>
                    <label htmlFor='phoneNumber'>Phone Number *</label>
                    <input
                      type='text'
                      id='phoneNumber'
                      name='phoneNumber'
                      placeholder='Enter phone number'
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.emptySlot} aria-hidden='true' />
                </>
              )}
            </div>

            {payOption === "withoutBill" && (
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label htmlFor='phoneNumber'>Phone Number *</label>
                  <input
                    type='text'
                    id='phoneNumber'
                    name='phoneNumber'
                    placeholder='Enter phone number'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.emptySlot} aria-hidden='true' />
              </div>
            )}

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor='address'>Address *</label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  placeholder='Enter address'
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.emptySlot} aria-hidden='true' />
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor='remark'>Remark</label>
                <input
                  type='text'
                  id='remark'
                  name='remark'
                  placeholder='Enter remark'
                  value={formData.remark}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.emptySlot} aria-hidden='true' />
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor='amountToPay'>
                  Amount to Pay (Ignore and Click "Pay Now" to pay in full) *
                </label>
                <input
                  type='text'
                  id='amountToPay'
                  name='amountToPay'
                  placeholder='Enter amount'
                  value={formData.amountToPay}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.emptySlot} aria-hidden='true' />
            </div>
          </div>

          <button type='submit' className={styles.submitBtn}>
            Pay ₦ {formData.amountToPay || "0.00"} now
          </button>
        </form>
      </div>
    </main>
  );
}
