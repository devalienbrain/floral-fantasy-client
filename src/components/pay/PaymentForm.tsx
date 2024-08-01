import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useCreatePaymentIntentMutation,
  useSavePaymentInfoMutation,
  useClearCartMutation, // Ensure you have this mutation defined
} from "@/redux/api/api";
import { ImSpinner9 } from "react-icons/im";

interface PaymentFormProps {
  data: {
    name: string;
    email: string;  // Added email here
    amount: number;
  };
  closeModal: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ data, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [savePaymentInfo] = useSavePaymentInfoMutation();
  const [clearCart] = useClearCartMutation(); // Use this mutation to clear the cart

  // Convert the price to an integer amount in cents
  const priceInCents = Math.round(data.amount * 100);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await createPaymentIntent({
          amount: priceInCents,
        }).unwrap();
        setClientSecret(response.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        toast.error("Failed to create payment intent");
      }
    };
    if (priceInCents) {
      fetchClientSecret();
    }
  }, [priceInCents, createPaymentIntent]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError  instanceof Error) {
      setCardError(paymentMethodError.message);
      return;
    } else {
      setCardError("");
    }

    setProcessing(true);

    try {
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              email: data.email,
              name: data.name,
            },
          },
        });

      if (confirmError  instanceof Error) {
        setCardError(confirmError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        const info = {
          email: data.email,
          name: data.name,
          paymentName: data.name,
          amount: data.amount,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        try {
          const saveInfoResponse = await savePaymentInfo(info).unwrap();
          if (saveInfoResponse.insertedId) {
            // Clear all cart items
            await clearCart({}).unwrap();
            setProcessing(false);
            navigate("/");
            toast.success("Your payment was successful and cart cleared!");
          }
        } catch (saveInfoError) {
          console.error("Error saving payment info:", saveInfoError);
          toast.error("Failed to save payment info");
          setProcessing(false);
        }
      }
    } catch (confirmError) {
      if (confirmError instanceof Error) {
        setCardError(confirmError.message);
    }
      setProcessing(false);
    }
  };

  return (
    <>
      <form className="my-2" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex mt-2 justify-around">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {processing ? (
              <ImSpinner9 className="m-auto animate-spin" size={24} />
            ) : (
              "Pay"
            )}
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default PaymentForm;
