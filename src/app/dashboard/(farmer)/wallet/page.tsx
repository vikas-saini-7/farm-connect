"use client"

import { motion } from "framer-motion"
import { CreditCard, Banknote, BadgeIndianRupee } from "lucide-react"

const balance = 35000

const transactions = [
  { label: "Sold Wheat", amount: "+ ₹10,000", date: "Mar 28, 2025" },
  { label: "Fertilizer Purchase", amount: "- ₹2,000", date: "Mar 26, 2025" },
  { label: "Sold Mangoes", amount: "+ ₹15,000", date: "Mar 20, 2025" },
  { label: "Transport Cost", amount: "- ₹3,000", date: "Mar 18, 2025" },
]

const subsidies = [
  { name: "PM-Kisan Yojana", amount: "₹6,000/year", status: "Active" },
  { name: "Solar Pump Subsidy", amount: "₹15,000", status: "Pending" },
  { name: "Drip Irrigation Scheme", amount: "₹20,000", status: "Active" },
  { name: "Organic Farming Support", amount: "₹10,000", status: "Pending" },
  { name: "Kisan Credit Card", amount: "₹3,00,000 credit", status: "Approved" },
  { name: "Cold Storage Grant", amount: "₹50,000", status: "Pending" },
  { name: "Animal Husbandry Aid", amount: "₹12,000", status: "Active" },
  { name: "Farm Mechanization", amount: "₹75,000", status: "Active" },
]

const loans = [
  { name: "Tractor Loan", amount: "₹2,50,000", status: "Ongoing", emi: "₹7,000/month" },
  { name: "Irrigation Setup", amount: "₹1,00,000", status: "Paid", emi: "₹5,000/month" },
]

export default function WalletPage() {
  return (
    <main className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <motion.h1 className="text-3xl font-bold text-center text-green-700"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        💼 Farmer Wallet
      </motion.h1>

      {/* Balance Section */}
      <motion.div className="bg-green-100 p-6 rounded-xl shadow flex items-center justify-between"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div>
          <h2 className="text-xl font-semibold">Available Balance</h2>
          <p className="text-2xl font-bold text-green-800">₹{balance.toLocaleString()}</p>
        </div>
        <BadgeIndianRupee className="w-10 h-10 text-green-700" />
      </motion.div>

      {/* Transactions */}
      <motion.section className="bg-white rounded-xl shadow p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
        <ul className="space-y-3 max-h-60 overflow-y-auto">
          {transactions.map((tx, i) => (
            <li key={i} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{tx.label}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <p className={`font-semibold ${tx.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {tx.amount}
              </p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Subsidies */}
      <motion.section className="bg-blue-50 rounded-xl shadow p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h2 className="text-lg font-semibold mb-2">Government Subsidies & Schemes</h2>
        <div className="overflow-x-auto whitespace-nowrap space-x-4 flex">
          {subsidies.map((sub, i) => (
            <div key={i} className="min-w-[220px] bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-blue-800">{sub.name}</h3>
              <p>{sub.amount}</p>
              <p className="text-sm text-gray-500">Status: {sub.status}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Loans */}
      <motion.section className="bg-red-50 rounded-xl shadow p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h2 className="text-lg font-semibold mb-2">Loans</h2>
        <div className="overflow-x-auto whitespace-nowrap space-x-4 flex">
          {loans.map((loan, i) => (
            <div key={i} className="min-w-[220px] bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-red-700">{loan.name}</h3>
              <p>Amount: {loan.amount}</p>
              <p>EMI: {loan.emi}</p>
              <p className="text-sm text-gray-500">Status: {loan.status}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  )
}
