const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

require('dotenv').config();
const port=process.env.SERVER_PORT || 3000;

const customerRoute=require('./router/CustomerRout');
const userRoute=require('./router/UserRoute');


mongoose.connect('mongodb://127.0.0.1:27017/customer_crud')
.then(()=>{
    app.listen(3000,()=>{
        console.log(`api start and running on port ${port}`);
    });
});

app.use('/api/v1/customers',customerRoute);//http;//localhost:3000/api/v1/customer/save-customer
app.use('/api/v1/users',userRoute);

app.use('/',(req,resp,next)=>{
    resp.send('<h1>Server is runniggggg yeeeee</h1>')
});