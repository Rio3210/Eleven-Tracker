const express=require('express');
const dotenv = require('dotenv');

const cors=require('cors');
const Transaction= require('./models/transaction');
const { default: mongoose } = require('mongoose');
const app=express();
// Load configuration from a .env file which is found in the backend
dotenv.config();
app.use(cors());
app.use(express.json())
app.get('/api/test',(req,res)=>{
    res.json('test is working')
});

app.post('/api/transaction',async (req,res)=>{

    await mongoose.connect(process.env.MONGO_URL)
    try{
    const {price,name,description,datetime}=req.body;
    const transaction=await Transaction.create({price,name,description,datetime})
    res.json(transaction);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions=await Transaction.find();
    res.json(transactions)
})
app.listen(4000);
