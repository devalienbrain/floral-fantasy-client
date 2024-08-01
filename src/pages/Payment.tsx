import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaQuestionCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Pay from "@/components/pay/Pay";

const Payment = () => {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");  // Added email state

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openModal();
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const data = { name, email, amount: totalPrice }; // Added email to data

  return (
    <>
      <Helmet>
        <title>Floral Fantasy | Payment</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-black/98 to-black/99">
        <div className="rounded-xl shadow-xl p-20 bg-white text-black">
          <div className="pb-5">
            <span className=" text-green-500 text-lg font-bold">Payment</span>
          </div>
          <div className="pb-5">
            <Link to="/paymentHistory">
              <span className="underline text-red-600 font-semibold">
                Payment history
              </span>
            </Link>
          </div>
          <hr />
          <div className="flex flex-col flex-1 pt-3">
            <h1 className="font-bold text-xl flex items-center gap-1">
              Pay your bill
              <FaQuestionCircle title="To pay you will need your card number." />
            </h1>
            {/* FORM STARTS */}
            <form onSubmit={handleSubmit} className="card-body text-black flex-1">
              <div className="form-control">
                <input
                  required
                  onChange={handleChangeName}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <input
                  required
                  onChange={handleChangeEmail}
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input mt-2 input-bordered w-full"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Your Address"
                  className="input mt-2 input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <input
                  required
                  value={totalPrice}
                  type="number"
                  name="amount"
                  placeholder="Amount to Pay"
                  className="input input-bordered w-full"
                  disabled
                />
              </div>

              <div className="form-control mt-6">
                <button className="p-3 rounded-lg text-white bg-green-500 w-full font-bold">
                  Pay ${totalPrice}
                </button>
              </div>
            </form>
            {/* FORM ENDS */}
          </div>
          <Pay data={data} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </>
  );
};

export default Payment;
