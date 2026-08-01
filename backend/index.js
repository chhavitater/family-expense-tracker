import express from 'express';
const app = express();
app.use(express.json());

let expenses = [];

app.get('/expenses', (req, res) => {
  res.status(200).json(expenses);
});

app.post('/expenses', (req,res) => {
  const { description, amount} = req.body;
  const id = Date.now().toString();
  const newExpense = {id, description, amount};
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

app.delete('/expenses/:id', (req, res) => {
  const id = req.params.id;
  expenses = expenses.filter(expense => expense.id !== id);
  res.status(204).send();
})

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});