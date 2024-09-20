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
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "@/app/public/assets/Logo2.png"
import Image from 'next/image';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const formatNumber = (value: number | string | null | undefined, isBalance: boolean = false): string => {
  if (value !== undefined && value !== null) {
    const numberValue = parseFloat(value as string);
    
    if (isNaN(numberValue)) {
      return value.toString();
    }

    if (isBalance) {
      // Balance COP (Pesos Colombianos)
      return numberValue % 1 === 0 
      ? `$${new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2 }).format(numberValue).replace('.', ',')}` // Formato sin decimales, pero siempre con dos decimales
      : `$${new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numberValue).replace('.', ',')}`; // Formato con dos decimales
    } else {
      // Para otros valores
      return numberValue % 1 === 0 
        ? numberValue.toString() 
        : numberValue.toFixed(2);
    }
  }
  
  return "N/A"; 
};

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
      const userResponse = await axios.get(`https://backend-bora.onrender.com/user/${userId}`);
      if (userResponse.data.ok) {
        const userData = userResponse.data.data;
        setUserData(userData);
        console.log("User Data:", userData);
  
        // Fetch transactions for the specific user
        const transactionsResponse = await axios.get(`https://backend-bora.onrender.com/transaction/history/${userId}`);
        if (transactionsResponse.data.ok) {
          const transactions = transactionsResponse.data.data; // Access transactions from 'data'
          console.log("Transactions:", transactions);
  
          if (Array.isArray(transactions) && transactions.length > 0) {
            setUserData((prev: any) => ({
              ...prev,
              transactionHistory: transactions
            }));
          } else {
            console.warn('No transactions found for this user.');
          }
        } else {
          console.error('Error fetching transactions:', transactionsResponse.data.message);
          toast.error('Error fetching transaction history.');
        }
      } else {
        console.error('Error:', userResponse.data.message);
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

    if (receiverAccountNumber === userData.accountNumber) {
      toast.error("You cannot send money to your own account.");
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

      toast.success("Transaction successfully");
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
  <section className="flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-8">
  <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-center">Welcome, {userData ? userData.name : 'User'}!</h1>

  {loading ? (
    <p>Loading user data...</p>
  ) : userData ? (
    <div className="flex flex-col md:flex-row justify-center items-start w-full">
      {/* Credit Card */}
      <div className="mt-6 sm:mt-10 w-full sm:w-[80%] md:w-1/3 relative p-4 sm:p-6 lg:p-8">
        <motion.div className="max-w-full mx-auto bg-gradient-to-r from-[#010D3E] to-[#001E80] rounded-lg shadow-lg p-4 relative overflow-hidden">
          <div className="absolute inset-0 rounded-lg shadow-lg blur-md opacity-30 bg-black"></div>
          <div className="flex justify-end items-center relative z-10">
            <span className="text-white text-lg font-bold">Bora</span>
          </div>
          <div className="relative z-10">
            <div className="absolute h-8 w-10 bg-white rounded flex items-center justify-center">
              <Chip alt="Chip" />
            </div>
            <br />
            <div className="mt-4">
              <span className="text-white text-sm font-bold">{userData.accountNumber}</span>
            </div>
            <div className="mt-4">
              <h1 className="text-white">Account Balance</h1>
              <span className="text-white text-lg font-bold">{formatNumber(userData.balance, true)}</span>
              <div className="flex justify-between items-center mt-1 gap-3">
                <span className="text-white">MetaBalance<br />{formatNumber(userData.value)}</span>
                <span className="text-white">Public Rate<br />{formatNumber(userData.public_rate)}%</span>
              </div>
              <div className="flex justify-end mt-3">
                <Network className="h-4 w-4 ml-2 transform rotate-45" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-10 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
          <button className="btn btn-primary hover:bg-[#001E80] py-2 px-4 rounded-lg shadow transition duration-300 w-full sm:w-auto" onClick={() => handleShowModal('send')}>
            Send Money
            <Image src={Logo} alt='Logo' className="h-5 w-5 ml-2" />
          </button>
          <button className="btn btn-primary hover:bg-[#001E80] py-2 px-4 rounded-lg shadow transition duration-300 w-full sm:w-auto" onClick={() => handleShowModal('deposit')}>
            Deposit Money
            <FontAwesomeIcon icon={faArrowDown} className="ml-2" />
          </button>
          <button className="btn btn-primary hover:bg-[#001E80] py-2 px-4 rounded-lg shadow transition duration-300 w-full sm:w-auto" onClick={() => handleShowModal('withdraw')}>
            Withdraw Money
            <FontAwesomeIcon icon={faArrowUp} className='ml-2' />
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6 sm:mt-10 w-full md:w-1/2 p-4">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Account Balance Over Time</h2>
        <Line data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Value Over Time',
              data: [userData.value],
              fill: false,
              backgroundColor: 'rgba(255,159,64,0.4)',
              borderColor: 'rgba(255,159,64,1)',
            },
            {
              label: 'Balance Over Time',
              data: [userData.balance],
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        }} />
      </div>

      {/* History Section */}
   <div className="mt-6 sm:mt-10 w-full md:w-1/3 p-4">
  <h2 className="text-lg sm:text-xl font-bold mb-4">
    Transaction History
    <FontAwesomeIcon icon={faHistory} className="ml-2" />
  </h2>
  
  {userData?.transactionHistory?.length > 0 ? (
    <ul>
      {userData.transactionHistory.map((transaction: any, index: number) => (
        <li key={index} className="mb-4 bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Image src={Logo} alt="Logo" className="h-6 w-6 bg-black rounded-full" />
              <span className="font-bold">
                {transaction.receiverName}
                <br />
                <span className="text-[#001E80] font-bold">Transfer Money</span>
              </span>
            </div>
          </div>
          <span>Numero de cuenta:</span> 
          <br />
          <span className="font-bold">
           {transaction.receiveraccountNumber}
          </span>
          <br />
          <hr className='m-3'/>
          <span className="text-[#ab2828] font-bold">
            -{formatNumber(transaction.amount, true)}
          </span>
          <br />
          <span>Fee Rate: {formatNumber(transaction.fee_rate)}%</span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="bg-white rounded-lg shadow-md p-4">No transactions found.</p>
  )}
   </div>
      {/* History Section */}
    </div>
  ) : (
    <p>No user data found.</p>
  )}

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
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          onClick={handleSendMoney}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner"></div>
          ) : (
            "Send"
          )}
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
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 transition duration-300 flex items-center justify-center"
          onClick={handleDeposit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner"></div>
          ) : (
            "Deposit"
          )}
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
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-red-500"
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
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          onClick={handleWithdraw}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner"></div> 
          ) : (
            "Withdraw"
          )}
        </button>
      </div>
    </div>
  </div>
)}
  </section>
    </>
  );
}