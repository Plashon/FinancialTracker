const express = require("express");
const router = express.Router();
const financialController = require("../controller/financial.controller");

// Create a financial Router
router.post("/",financialController.create);
//retrieve all financial 
router.get("/",financialController.getAll);
//retrieve a financial by id 
router.get("/:id",financialController.getById)
//retrieve a financial  by User Id
router.get("/user/:userId",financialController.getByUserId)
//Edit  a financial by Id 
router.put("/:id",financialController.updateById)
//delete a financial by Id 
router.delete("/:id",financialController.deleteById)

module.exports = router;