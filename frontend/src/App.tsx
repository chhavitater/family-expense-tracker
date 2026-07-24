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
      <form onSubmit={handleSubmit}>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Expense</button>
      </form>
      {expenses.map((expense, index) => (
        <ExpenseItem key={index} description={expense.description} amount={expense.amount} />
      ))}
    </>
  )
}

export default App

interface ExpenseItemProps {
  description: string;
  amount: number;
}
function ExpenseItem({ description, amount}: ExpenseItemProps) {
  return <p>{description} - ${amount}</p>;
}
