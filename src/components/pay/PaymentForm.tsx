/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import './form.css'
import { ImSpinner9 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
// import axios from 'axios' // Ensure axios or axiosSecure is imported
// import { UserContext } from '../context/UserContext' // Replace with your actual context

const PaymentForm = ({ data, closeModal }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()
  // const { user } = useContext(UserContext) // Replace with your actual context

  const price = Number(data.amount)

  // Create Payment Intent
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post("/paymentIntent", { price })
        setClientSecret(response.data.clientSecret)
      } catch (error) {
        console.error('Error creating payment intent:', error)
        toast.error('Failed to create payment intent')
      }
    }
    if (price) {
      createPaymentIntent()
    }
  }, [price])

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (paymentMethodError) {
      setCardError(paymentMethodError.message)
      return
    } else {
      setCardError('')
    }

    setProcessing(true)

    try {
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      })

      if (confirmError) {
        setCardError(confirmError.message)
        setProcessing(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        const info = {
          Email: user?.email,
          Name: user?.displayName,
          PaymentName: data.name,
          amount: data.amount,
          transactionId: paymentIntent.id,
          date: new Date(),
        }
        console.log(info)

        try {
          const saveInfoResponse = await axios.post("/saveInfo", info)
          if (saveInfoResponse.data._id) {
            setProcessing(false)
            navigate('/')
            toast.success("Your payment was successful!")
          }
        } catch (saveInfoError) {
          console.error('Error saving payment info:', saveInfoError)
          toast.error('Failed to save payment info')
          setProcessing(false)
        }
      }
    } catch (confirmError) {
      setCardError(confirmError.message)
      setProcessing(false)
    }
  }

  return (
    <>
      <form className='my-2' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className='flex mt-2 justify-around'>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={!stripe || !clientSecret || processing}
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          >
            {processing ? (
              <ImSpinner9 className='m-auto animate-spin' size={24} />
            ) : (
              'Pay'
            )}
          </button>
        </div>
      </form>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    </>
  )
}

export default PaymentForm
