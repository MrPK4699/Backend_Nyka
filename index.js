const express = require('express');
const mongoose = require('mongoose');
const {MongoUrl} = require('./config/config');
const cors= require('cors');

const userRoutes=require('./routes/userRoutes')
const productsRoutes=require('./routes/productsRoutes')
const errorHandlers=require('./utils/errorHandlers')

const app= express();

mongoose.connect(MongoUrl,  { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Mongodb is connected');
})
.catch(err=>{console.log(`connection failed : ${err}`)});

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));

app.get('/', (req,res)=>{
    res.json({'msg':'All is Well' })
})

app.use('/api/user', userRoutes);
app.use('/api/products', productsRoutes);

app.use(errorHandlers);

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})