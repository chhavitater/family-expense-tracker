import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/expenses', async (req, res) => {
  try{
    const expenses = await prisma.expense.findMany();
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to fetch expenses'});
  }  
});

app.post('/expenses', async (req, res) => {
  try{
    const { description, amount} = req.body;
    
    const newExpense = await prisma.expense.create({
      data: { description, amount, paidByUserId: 'test-user-1'},
    });
    res.status(201).json(newExpense);
  } catch (error){
    console.error(error);
    res.status(500).json({error: 'Failed to create expense'});
  }
  
});

app.delete('/expenses/:id', async (req, res) => {
  try{
    const id = req.params.id;
    await prisma.expense.delete({
      where: { id },
    });
    res.status(204).send();
  }catch (error){
    console.error(error);
    res.status(500).json({error: 'Failed to delete expense'});
  }
  
})

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});