import { useState } from 'react'
import './App.css'

interface Expense {
  description: string;
  amount: number;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const[amount, setAmount] = useState("");
  const[error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if(description.trim() === ""){
      setError("Description is required");
      return;
    }
    const numericAmount = Number(amount);
    if(isNaN(numericAmount) || numericAmount <= 0){
      setError("Amount must be a positive number.");
      return;
    }
    setError("");
    const newExpense: Expense = {description, amount: numericAmount};
    setExpenses([...expenses, newExpense]);
    setDescription("");
    setAmount("");
  }

  return (
    <>
      <form className="flex flex-col gap-2 p-4 max-w-sm" onSubmit={handleSubmit}>
        <input className="border rounded px-3 py-2" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <input className="border rounded px-3 py-2"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 text-white font-bold py-2 rounded" type="submit">Add Expense</button>
      </form>
      <div className="max-w-sm">
        {expenses.map((expense, index) => (
          <ExpenseItem key={index} description={expense.description} amount={expense.amount} />
        ))}
      </div> 
    </>
  )
}

export default App

interface ExpenseItemProps {
  description: string;
  amount: number;
}
function ExpenseItem({ description, amount}: ExpenseItemProps) {
  return(
    <p className="flex justify-between p-3 border-b">
      <span>{description}</span>
      <span className="font-bold">${amount}</span>
    </p>
  );
}
