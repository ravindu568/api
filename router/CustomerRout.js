const express=require('express');

const CustomerController=require('./../controller/CustomerController');

const router=express.Router();

const VerifyToken=require('./../middlewere/AuthMiddlewere');


router.post('/save-customer',VerifyToken,CustomerController.saveCustomer);
router.put('/update-customer',VerifyToken,CustomerController.updateCustomer);
router.delete('/delete-customer',VerifyToken,CustomerController.deleteCustomer);
router.get('/get-customer',VerifyToken,CustomerController.findCustomer);
router.get('/get-all-customer',VerifyToken,CustomerController.findAllCustomer);

module.exports=router;