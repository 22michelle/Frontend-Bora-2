"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; 
import Chip from '@/app/public/assets/chip-credit.svg'; 
import Network from '@/app/public/assets/network.svg';
import { Header } from '@/app/components/Header';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { toast } from 'react-toastify'; // Asegúrate de importar toast correctamente

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  const [formData, setFormData] = useState({
    receiverAccountNumber: "",
    amount: "",
    feeRate: "",
  });
  
  const [depositData, setDepositData] = useState({
    amount: "",
  });
  
  const [withdrawData, setWithdrawData] = useState({
    amount: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserData(userId);
    } else {
      console.error("No user ID found in local storage.");
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`https://backend-bora.onrender.com/user/${userId}`);
      if (response.data.ok) {
        setUserData(response.data.data);
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (modal: string) => {
    switch (modal) {
      case "send":
        setShowSendModal(true);
        break;
      case "deposit":
        setShowDepositModal(true);
        break;
      case "withdraw":
        setShowWithdrawModal(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = (modal: string) => {
    switch (modal) {
      case "send":
        setShowSendModal(false);
        break;
      case "deposit":
        setShowDepositModal(false);
        break;
      case "withdraw":
        setShowWithdrawModal(false);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, stateSetter: React.Dispatch<React.SetStateAction<any>>) => {
    const { name, value } = e.target;
    stateSetter((prev: any) => ({ ...prev, [name]: value }));
  };

  // Send Money
  const handleSendMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { receiverAccountNumber, amount, feeRate } = formData;

    if (!receiverAccountNumber || !amount || !feeRate) {
      toast.error("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const senderAccountNumber = userData.accountNumber;
      const response = await axios.post(
        "https://backend-bora.onrender.com/transaction/transaction",
        {
          senderAccountNumber,
          receiverAccountNumber,
          amount: Number(amount),
          feeRate: Number(feeRate),
        },
        { withCredentials: true }
      );

      toast.success("Transaction created successfully");
      handleCloseModal("send");

      // Refresh user data
      const userId = localStorage.getItem("userId");
      const userResponse = await axios.get(`https://backend-bora.onrender.com/user/${userId}`, { withCredentials: true });
      setUserData(userResponse.data.data);

    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("Failed to create transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Desposit Money
  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { amount } = depositData;
    const accountNumber = userData?.accountNumber;
  
    if (!amount) {
      toast.error("The amount is required");
      setIsSubmitting(false);
      return;
    }
  
    try {
      // Log the data before making the request
      console.log("Sending deposit data:", { amount });
  
      const response = await axios.post(
        "https://backend-bora.onrender.com/transaction/deposit",
        { amount, accountNumber }, 
        { withCredentials: true }
      );
  
      console.log("Deposit response:", response.data);
      
      toast.success("Deposit successful");
      handleCloseModal("deposit");
      setDepositData({ amount: "" });
  
      // Refresh user data after successful deposit
      const userId = localStorage.getItem("userId");
      const userResponse = await axios.get(`https://backend-bora.onrender.com/user/${userId}`, { withCredentials: true });
      setUserData(userResponse.data.data);
  
    } catch (error) {
      console.error("Error deposit money:", error);
      toast.error("Failed to deposit money");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Withdraw Money 
  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { amount } = withdrawData;
    const accountNumber = userData?.accountNumber;

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("The amount is required and must be greater than zero.");
      setIsSubmitting(false);
      return;
    }

    if (!userData || parseFloat(amount) > parseFloat(userData.balance)) {
      toast.error("Insufficient balance");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(
        "https://backend-bora.onrender.com/transaction/withdraw",
        { amount, accountNumber },
        { withCredentials: true }
      );

      toast.success("Withdrawal successful");
      setWithdrawData({ amount: "" });
      handleCloseModal("withdraw");

      // Refresh user data
      const userId = localStorage.getItem("userId");
      const userResponse = await axios.get(`https://backend-bora.onrender.com/user/${userId}`, { withCredentials: true });
      setUserData(userResponse.data.data);

    } catch (error) {
      console.error("Error withdrawing money:", error);
      toast.error("Failed to withdraw money");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header isDashboardPage={true} />
      <section className="flex flex-col items-center justify-center bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-8">Welcome, {userData ? userData.name : 'User'}!</h1>
        {loading ? (
          <p>Loading user data...</p>
        ) : userData ? (
          <div className="flex flex-col md:flex-row justify-center items-start w-full">
            {/* Credit Card */}
            <div className="mt-10 md:w-1/3 relative">
              <motion.div className="max-w-lg mx-auto bg-gradient-to-r from-[#010D3E] to-[#001E80] rounded-lg shadow-lg p-8 relative overflow-hidden">
                <div className="absolute inset-0 rounded-lg shadow-lg blur-md opacity-30 bg-black"></div>
                <div className="flex justify-end items-center relative z-10">
                  <span className="text-white text-lg font-bold">Bora</span>
                </div>
                <div className="relative z-10">
                  <div className="absolute h-8 w-10 bg-white rounded flex items-center justify-center">
                    <Chip className="" alt="Chip" />
                  </div>
                  <br />
                  <div className="mt-4">
                    <span className="text-white text-sm font-bold">
                      {userData.accountNumber}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h1 className='text-white'>Account Balance</h1>
                    <span className="text-white text-lg font-bold">
                      ${userData.balance}
                    </span>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-white">02/24</span>
                      <Network className="h-4 w-4 ml-2 transform rotate-45" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* End Credit Card */}

            {/* Chart Section */}
            <div className="mt-10 md:w-1/2 p-4">
              <h2 className="text-xl font-bold mb-4">Account Balance Over Time</h2>
              <Line data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Account Balance Over Time',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                  },
                ],
              }} />
            </div>

            {/* Additional Cards Section */}
            <div className="mt-10 md:mt-0 md:w-1/3 p-4">
              <h2 className="text-xl font-bold mb-4">Additional Information</h2>
              <div className="grid grid-cols-1 gap-4">
                {/* Example Card 1 */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-bold">Recent Transactions</h3>
                  <p>View your recent transactions here.</p>
                </div>
                {/* Example Card 2 */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-bold">Account Limits</h3>
                  <p>Check your account limits and settings.</p>
                </div>
                {/* Example Card 3 */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-bold">Rewards Points</h3>
                  <p>Track your rewards points and benefits.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No user data found.</p>
        )}

        {/* Action Buttons */}
        <div className="mt-10 flex justify-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300" onClick={() => handleShowModal('send')}>
            Send Money
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-300" onClick={() => handleShowModal('deposit')}>
            Deposit Money
          </button>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow hover:bg-yellow-600 transition duration-300" onClick={() => handleShowModal('withdraw')}>
            Withdraw Money
          </button>
        </div>

    {/* Send Money Modal */}
    {showSendModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Send Money</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="receiverAccountNumber"
          placeholder="Recipient Account Number"
          value={formData.receiverAccountNumber}
          onChange={(e) => handleInputChange(e, setFormData)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => handleInputChange(e, setFormData)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          name="feeRate"
          placeholder="Fee Rate (%)"
          value={formData.feeRate}
          onChange={(e) => handleInputChange(e, setFormData)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration-300"
          onClick={() => handleCloseModal('send')}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300"
          onClick={handleSendMoney}
        >
          Send
        </button>
      </div>
    </div>
  </div>
    )}

    {/* Deposit Money Modal */}
    {showDepositModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Deposit Money</h2>
      <div className="space-y-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={depositData.amount}
          onChange={(e) => handleInputChange(e, setDepositData)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-green-500"
        />
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration-300"
          onClick={() => handleCloseModal('deposit')}
        >
          Cancel
        </button>
        <button
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 transition duration-300"
          onClick={handleDeposit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Depositing..." : "Deposit"}
        </button>
      </div>
    </div>
  </div>
    )}

    {/* Withdraw Money Modal */}
    {showWithdrawModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Withdraw Money</h2>
      <div className="space-y-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={withdrawData.amount}
          onChange={(e) => handleInputChange(e, setWithdrawData)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-yellow-500"
        />
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration-300"
          onClick={() => handleCloseModal('withdraw')}
        >
          Cancel
        </button>
        <button
          className="bg-yellow-600 text-white py-2 px-6 rounded-lg shadow hover:bg-yellow-700 transition duration-300"
          onClick={handleWithdraw}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Withdrawing..." : "Withdraw"}
        </button>
      </div>
    </div>
  </div>
    )}
  </section>
</>

  );
}