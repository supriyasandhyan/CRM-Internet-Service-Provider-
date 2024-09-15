const express = require('express');
const router = express.Router();
const { addEmpLogic, getAllEmpsLogic, editEmpLogic, deleteEmpLogic } = require('../Controllers/EmpController');

// POST route to create a new plan
router.post('/add-emp', addEmpLogic);
router.get('/get-emp', getAllEmpsLogic);
router.put('/edit-emp/:id', editEmpLogic);
router.delete('/delete-emp/:id', deleteEmpLogic);

module.exports = router;
