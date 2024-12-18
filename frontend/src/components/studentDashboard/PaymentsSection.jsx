import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PaymentsSection = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    const payments = mockDataService.getPaymentHistory();
    setPaymentHistory(payments);

    // Calculate total paid amount
    const total = payments.reduce(
      (sum, payment) =>
        payment.status === "Confirmé" ? sum + payment.amount : sum,
      0
    );
    setTotalPaid(total);
  }, []);

  const handlePayment = (paymentId) => {
    // Simulate payment process
    alert(`Processus de paiement pour l'ID ${paymentId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Historique des Paiements</h2>
          <div className="text-green-600 font-bold">
            Total Payé: {totalPaid} €
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Travaux Pratiques</th>
              <th className="p-2 text-left">Montant</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Statut</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="p-2">{payment.practicalWork}</td>
                <td className="p-2">{payment.amount} €</td>
                <td className="p-2">{payment.date}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      payment.status === "Confirmé"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="p-2 text-right">
                  {payment.status !== "Confirmé" && (
                    <button
                      onClick={() => handlePayment(payment.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Payer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PaymentsSection;
