"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Chip from '@/app/public/assets/chip-credit.svg';
import Network from '@/app/public/assets/network.svg';
import { Header } from '@/app/components/Header';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "@/app/public/assets/Logo2.png"
import Image from 'next/image';

const formatNumber = (value: number | string | null | undefined, isBalance: boolean = false): string => {
  if (value !== undefined && value !== null) {
    const numberValue = parseFloat(value as string);
    
    if (isNaN(numberValue)) {
      return value.toString();
    }

    if (isBalance) {
      // Balance COP (Pesos Colombianos)
      return numberValue % 1 === 0 
      ? `$${new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2 }).format(numberValue).replace('.', '.')}`
      : `$${new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numberValue).replace(',', '.')}`; 
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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showConfirmDepositModal, setShowConfirmDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showConfirmWithdrawModal, setShowConfirmWithdrawModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [confirmation, setConfirmation] = useState(false);

  const [formData, setFormData] = useState({
    receiverAccountNumber: "",
    amount: "",
    feeRate: "",
  });

  // Deposit Money Modal: Show confirmation before proceeding
const handleDepositButtonClick = () => {
  const { amount } = depositData;
  if (!amount) {
    toast.error("The amount is required");
    return;
  }
  setShowConfirmDepositModal(true);  // Show confirmation modal
};

// Confirm Deposit Modal: After confirmation, handle the actual deposit
const handleConfirmDeposit = async () => {
  setIsSubmitting(true);
  const { amount } = depositData;
  const accountNumber = userData?.accountNumber;

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
    setDepositData({ amount: "" });
    setShowConfirmDepositModal(false);  // Close confirmation modal

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
  const handleSendMoney = async () => {
  // e.preventDefault();
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

    if (response.data.ok) {
      toast.success("Transaction successful");
      handleCloseModal("send");

      // Update data
      const userId = localStorage.getItem("userId");
      const senderResponse = await axios.get(`https://backend-bora.onrender.com/user/${userId}`, { withCredentials: true });
      setUserData(senderResponse.data.data);
    } else {
      toast.error("Failed to create transaction");
    }
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

  const handleConfirmWithdraw = async () => {
    setIsSubmitting(true);
    const { amount } = withdrawData;
    const accountNumber = userData?.accountNumber;
    try {
      await axios.post(
        "https://backend-bora.onrender.com/transaction/withdraw",
        { amount, accountNumber },
        { withCredentials: true }
      );

      toast.success("Withdrawal successful");
      setWithdrawData({ amount: "" });
      setShowConfirmWithdrawModal(false);  // Close confirmation modal

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

  // Withdraw Money
  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { amount } = withdrawData;
    const accountNumber = userData?.accountNumber;
  
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("The amount is required and must be greater than zero.");
      return;
    }
  
    if (!userData || parseFloat(amount) > parseFloat(userData.balance)) {
      toast.error("Insufficient balance");
      return;
    }
  
    // Show the confirmation modal before proceeding
    setShowConfirmWithdrawModal(true);
  };

  return (
    <>
  <Header isDashboardPage={true} />
  <section className="flex flex-col items-center justify-center p-4 sm:p-1">
  <h1 className="text-xl sm:text-2xl font-bold sm:mb-3 text-center">Welcome, {userData ? userData.name : 'User'}!</h1>

  {loading ? (
  <p>Loading user data...</p>
) : userData ? (
  <div className="flex flex-col md:flex-row justify-center items-center w-full">
    {/* Credit Card */}
    <div className="mt-6 sm:mt-10 w-full sm:w-[90%] md:w-[40%] xl:w-[30%] relative p-4 sm:p-6 lg:p-8">
      <motion.div className="max-w-full mx-auto bg-gradient-to-r from-[#010D3E] to-[#001E80] rounded-lg shadow-lg p-8 relative overflow-hidden">
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
              <span className="text-white">Overall Rate<br />{formatNumber(userData.public_rate)}%</span>
            </div>
            <div className="flex justify-end mt-3">
              <Network className="h-4 w-4 ml-2 transform rotate-45" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="mt-6 sm:mt-10 flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 md:flex-row md:space-x-4">
        <button className="btn btn-primary hover:bg-[#001E80] py-2 px-4 rounded-lg shadow transition duration-300 w-full sm:w-auto"
        onClick={() => handleShowModal('send')}>
          Send Money
          <Image src={Logo} alt="Logo" className="h-5 w-5 ml-2" />
        </button>
        <button className="btn btn-primary hover:bg-[#001E80] py-2 px-4 rounded-lg shadow transition duration-300 w-full sm:w-auto"
        onClick={() => handleShowModal('deposit')}>
          Deposit Money
          <FontAwesomeIcon icon={faArrowDown} className="ml-2" />
        </button>
        <button className="btn btn-primary hover:bg-[#001E80] py-2 px-4 rounded-lg shadow transition duration-300 w-full sm:w-auto"
        onClick={() => handleShowModal('withdraw')}>
          Withdraw Money
          <FontAwesomeIcon icon={faArrowUp} className="ml-2" />
        </button>
      </div>
      {/* End Action Buttons */}
    </div>

    {/* History Section */}
    <div className="mt-6 sm:mt-10 w-full md:w-2/3 lg:w-1/2 p-4">
    <div className='flex items-center justify-between mb-4'>
  <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
    Transaction History
    <FontAwesomeIcon icon={faHistory} className="ml-2 text-blue-600" />
  </h2>
  <button
    onClick={() => setShowModal(true)} 
    className="text-lg font-bold text-gray-800 cursor-pointer underline">
    See More
  </button>
</div>
  
  {userData?.transactionHistory?.length > 0 ? (
    <>
      <ul>
        {userData.transactionHistory
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3)
          .map((transaction: any, index: number) => (
            <li key={index} className="mb-6 bg-white rounded-lg shadow-md p-5 transition-transform transform hover:scale-105">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Image src={Logo} alt="Logo" className="h-8 w-8 bg-black rounded-full" />
                  <div>
                    <span className="font-bold text-gray-800">
                      {userData._id === transaction.senderId
                      ? `Sent to:`
                      : `Received from:`}
                    </span>
                    <br />
                    <span>
                      {userData._id === transaction.senderId
                      ? transaction.receiverName
                      : transaction.senderName}
                    </span>
                  </div>
                </div>
                <div className={`${userData._id === transaction.senderId ? "text-red-600" : "text-green-600"} font-bold text-lg`}>
                  {userData._id === transaction.senderId ? `-${formatNumber(transaction.amount, true)}` : `+${formatNumber(transaction.amount, true)}`}
                </div>
              </div>

              <hr className="my-3" />

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <span className="block text-sm font-bold text-gray-700">Account Number:</span>
                  <span className="text-md text-gray-800">
                  {userData._id === transaction.senderId
                    ? transaction.receiveraccountNumber
                    : transaction.senderaccountNumber
                  }
                  </span>
                </div>
                <div className='p-1 ml-10'>
                  <span className="text-blue-600 font-bold">
                    {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  ) : (
    <p className="bg-white rounded-lg shadow-md p-4 text-center text-gray-500">No transactions found.</p>
  )}
    </div>
    {/* End History Section */}
  </div>
) : (
  <p>No user data found.</p>
)}

{/* Transaction History Modal */}
{showModal && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 flex items-center">
        Transaction History
        <FontAwesomeIcon icon={faHistory} className="ml-2 text-blue-600" />
      </h2>

      {/* Scrollable transaction list with max height */}
      <div className="max-h-96 p-5 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <ul>
          {userData.transactionHistory
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((transaction: any, index: number) => (
              <li key={index} className="mb-4 bg-gray-100 rounded-lg shadow p-4 transition-transform hover:scale-105">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Image src={Logo} alt="Logo" className="h-8 w-8 bg-black rounded-full" />
                    <div>
                    <span className="font-bold text-gray-800">
                      {userData._id === transaction.senderId
                      ? `Sent to:`
                      : `Received from:`}
                    </span>
                    <br />
                    <span>
                      {userData._id === transaction.senderId
                      ? transaction.receiverName
                      : transaction.senderName}
                    </span>
                  </div>
                  </div>
                  <div className={`${userData._id === transaction.senderId ? "text-red-600" : "text-green-600"} font-bold text-lg`}>
                    {userData._id === transaction.senderId ? `-${formatNumber(transaction.amount, true)}` : `+${formatNumber(transaction.amount, true)}`}
                  </div>
                </div>

                <hr className="my-3" />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <span className="block text-sm font-bold text-gray-700">Account Number:</span>
                  <span className="text-md text-gray-800">
                    {userData._id === transaction.senderId ? transaction.receiveraccountNumber : transaction.senderaccountNumber}
                  </span>
                </div>
                <div className='p-1 ml-10'>
                  <span className="text-blue-600 font-bold">
                    {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              </li>
            ))}
        </ul>
      </div>

      <button onClick={() => setShowModal(false)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Close
      </button>
    </div>
  </div>
)}
{/* End Transaction History Modal */}

{/* Send Money Modal */}
{showSendModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-transform transform-gpu hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Send Money</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="receiverAccountNumber"
          placeholder="Recipient Account Number"
          value={formData.receiverAccountNumber}
          onChange={(e) => handleInputChange(e, setFormData)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500 transition duration-200"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => handleInputChange(e, setFormData)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500 transition duration-200"
        />
        <div className="relative">
          <label className="block text-gray-700 mb-1">Fee Rate (%)</label>
          <input
            type="number"
            name="feeRate"
            placeholder="Fee Rate (%)"
            value={formData.feeRate}
            onChange={(e) => handleInputChange(e, setFormData)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500 transition duration-200 mb-2"
          />
          <input
            type="range"
            name="feeRateSlider"
            min="0"
            max="10"
            value={formData.feeRate}
            onChange={(e) => {
              const newFeeRate = e.target.value;
              setFormData({ ...formData, feeRate: newFeeRate });
            }}
            className="slider w-full h-2 bg-gray-200 rounded-lg cursor-pointer appearance-none"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>0%</span>
            <span>10%</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration-300 transform hover:scale-105"
          onClick={() => handleCloseModal('send')}
        >
          Cancel
        </button>
        <button
          className={`bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => {
            const { receiverAccountNumber, amount, feeRate } = formData;
            if (!receiverAccountNumber || !amount || !feeRate) {
              toast.error("Please fill out all fields.");
              return;
            }
            setShowConfirmationModal(true);
          }}
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

{/* Confirmation Send Modal */}
{showConfirmationModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-8 lg:p-20">
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md sm:max-w-sm lg:max-w-lg transition-transform transform-gpu hover:scale-105">
      {/* Header Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Confirm Transaction</h2>
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-600">Date: <strong className="text-gray-800">{new Date().toLocaleDateString()}</strong></p>
      </div>

      {/* Invoice-like structure */}
      <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-md">
        <p className="text-gray-700 mb-2">
          Are you sure you want to send 
          <span className="text-blue-600 font-bold">
            <strong> ${Number(formData.amount)}</strong>
          </span> to account 
          <strong className="text-blue-600"> {formData.receiverAccountNumber}</strong> with a Fee Rate of 
          <strong className="text-blue-600"> {formData.feeRate}%</strong>?
        </p>

        {/* Breakdown of the transaction */}
        <div className="border-t border-gray-200 pt-2 mt-2">
          <p className="text-gray-600 mb-1">Transaction Amount:</p>
          <p className="text-gray-800 font-bold">${formData.amount}</p>
          
          <p className="text-gray-600 mb-1">Metabalance Deduction:</p>
          <p className="text-gray-800 font-bold">${(Number(formData.amount) * (Number(formData.feeRate) / 100))}</p>

          <p className="text-gray-600 mt-2">FeeRate:</p>
          <strong className="text-gray-800 font-bold"> ${(Number(formData.feeRate))}</strong>

          <hr className='my-2 border-gray-200'/>
          
          <div className="flex justify-between">
            <p className="text-gray-600 mb-1">Total Amount:</p>
            <p className="flex justify-end text-gray-800 font-bold">
              <strong> ${Number(formData.amount) + (Number(formData.amount) * (Number(formData.feeRate) / 100))}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          className="bg-red-500 text-white py-2 px-6 rounded-lg shadow hover:bg-red-600 transition duration-200 transform hover:scale-105"
          onClick={() => setShowConfirmationModal(false)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-200 transform hover:scale-105"
          onClick={() => {
            handleSendMoney();
            setShowConfirmationModal(false);
          }}
        >
          Confirm Send
        </button>
      </div>
    </div>
  </div>
)}

{/* Confirm Deposit Modal: Show confirmation before processing deposit */}
{showConfirmDepositModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-transform transform-gpu hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Confirm Deposit</h2>
      <p className="text-gray-600 mb-6 text-center">
        Are you sure you want to deposit <strong>${depositData.amount}</strong>?
      </p>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration-300 transform hover:scale-105"
          onClick={() => setShowConfirmDepositModal(false)} // Close confirmation modal
        >
          Cancel
        </button>
        <button
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 transition duration-300 transform hover:scale-105"
          onClick={handleConfirmDeposit} // Confirm and process deposit
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner"></div>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  </div>
)}

{/* Deposit Money Modal: Trigger confirmation on click */}
{showDepositModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-transform transform-gpu hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Deposit Money</h2>
      <div className="space-y-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={depositData.amount}
          onChange={(e) => handleInputChange(e, setDepositData)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-green-500 transition duration-200"
        />
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration-300 transform hover:scale-105"
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

{/* Confirm Deposit Modal: Show confirmation before processing deposit */}
{showConfirmDepositModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Confirm Deposit</h2>
      <p className="text-gray-600 mb-6 text-center">
        Are you sure you want to deposit <strong>${depositData.amount}</strong>?
      </p>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration-300"
          onClick={() => setShowConfirmDepositModal(false)}  // Close confirmation modal
        >
          Cancel
        </button>
        <button
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow hover:bg-green-700 transition duration-300"
          onClick={handleConfirmDeposit}  // Confirm and process deposit
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner"></div>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  </div>
)}

{/* Confirm Withdrawal Modal: Show confirmation before processing withdrawal */}
{showConfirmWithdrawModal && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3"
    style={{ zIndex: 9999 }} // Ensures the modal is on top
  >
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Confirm Withdrawal</h2>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Are you sure you want to withdraw ${withdrawData.amount}?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration-300"
          onClick={() => setShowConfirmWithdrawModal(false)} // Close the confirmation modal
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700"
          onClick={handleConfirmWithdraw}
          disabled={isSubmitting}
        >
          {isSubmitting ? <div className="spinner"></div> : "Confirm Withdraw"}
        </button>
      </div>
    </div>
  </div>
)}

{/* Withdraw Money Modal */}
{showWithdrawModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-transform transform-gpu hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Withdraw Money</h2>
      <div className="space-y-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={withdrawData.amount}
          onChange={(e) => handleInputChange(e, setWithdrawData)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-red-500 transition duration-200"
        />
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration=300 transform hover:scale=105"
          onClick={() => handleCloseModal('withdraw')}
        >
          Cancel
        </button>
        <button
          className={`bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition duration=300 flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-notallowed' : ''}`}
          onClick={() => setShowConfirmWithdrawModal(true)} // Abre el modal de confirmación
          disabled={isSubmitting}
        >
          Withdraw
        </button>
      </div>
    </div>
  </div>
)}

{/* Confirm Withdrawal Modal: Show confirmation before processing withdrawal */}
{showConfirmWithdrawModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transition-transform transform-gpu hover:scale-105">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Confirm Withdrawal</h2>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Are you sure you want to withdraw <strong>${withdrawData.amount}</strong>?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-lg shadow hover:bg-red-700 transition duration=300 transform hover:scale=105"
          onClick={() => setShowConfirmWithdrawModal(false)} // Cierra el modal de confirmación
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition duration=300 transform hover:scale=105"
          onClick={handleConfirmWithdraw}
          disabled={isSubmitting}
        >
          {isSubmitting ? <div className="spinner"></div> : "Confirm Withdraw"}
        </button>
      </div>
    </div>
  </div>
)}

  </section>
</>
  );
}