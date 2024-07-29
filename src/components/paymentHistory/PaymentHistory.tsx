import React from "react";
import { useGetUsersWhoPaidQuery } from "@/redux/api/api";
import { Helmet } from "react-helmet-async";

type TPayment = {
  name: string;
  totalAmount: number;
  paymentCount: number;
  lastPaymentDate: string;
};

const PaymentHistory = () => {
  const { data, error, isLoading } = useGetUsersWhoPaidQuery();

  if (isLoading) {
    return <p className="text-green-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching payment history</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-yellow-500">No payment history found</p>;
  }

  return (
    <>
      <Helmet>
        <title>Floral Fantasy | Payment History</title>
      </Helmet>
      <div className="max-w-7xl mx-auto p-10 text-black">
        <h1 className="text-center py-10 text-6xl font-black text-red-600">
          Payment History
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr className="font-bold text-base">
                <th className="text-left">Name</th>
                <th className="text-left">Total Amount Paid</th>
                <th className="text-left">Number of Payments</th>
                <th className="text-left">Last Payment Date</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {data?.map((payment: TPayment) => (
                <tr key={payment.name}>
                  <td>{payment.name}</td>
                  <td>${payment.totalAmount.toFixed(2)}</td>
                  <td>{payment.paymentCount}</td>
                  <td>{new Date(payment.lastPaymentDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
