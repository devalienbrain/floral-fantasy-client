import Pay from "@/components/pay/Pay";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaQuestionCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 };

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const data = { name, amount: totalPrice };

  return (
    <>
      <Helmet>
        <title>Floral Fantasy | Payment</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-black/90 via-black/80 to-black/90">
        <div className="rounded-xl shadow-xl p-20 bg-white text-black">
          <div className="pb-5">
            <span className="underline text-green-500"> Payment</span>
          </div>
          <hr />
          <div className="flex flex-col flex-1 pt-3">
            <h1 className="font-bold text-xl flex items-center gap-1">
              Pay your bill
              <FaQuestionCircle title="To pay you will need your card number." />
            </h1>
            {/* FORM STARTS */}
            <form
              onSubmit={handleSubmit}
              className="card-body text-black flex-1"
            >
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
