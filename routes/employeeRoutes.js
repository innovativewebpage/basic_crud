const express = require('express')
const router = express.Router();


const Employee = require('../model/employeeModel');


//create
router.post('/create',async (req,res) => {	
	const employee = new Employee({	
		empName : req.body.empName,
		empEmail : req.body.empEmail,
		empMobile: req.body.empMobile,
		empDob:req.body.empDob
	});

  
const newEmployee = await employee.save();
  
  if (newEmployee) {
    return res
      .status(201)
      .send({ message: 'New Employee Inserted', 
	  data: newEmployee });
  }
  return res.status(500).send({ message: ' Error in Inserting Employee.' });
});


//Get
router.get("/read",async (req,res) => {
	var findEmployee = await Employee.find();
res.json(findEmployee);
})



//Delete
router.delete('/:id', async (req, res) => {
  var deletedEmployee = await Employee.findById(req.params.id);
  if (deletedEmployee) {
     deletedEmployee = await deletedEmployee.remove();
   res.json( deletedEmployee );
  } else {
    res.send('Error in Deletion.');
  }
  
});


//Update
router.put("/:id",  async (req, res) => {
	 try {
    let updateEmployee = await Employee.findById(req.params.id);
    const data = {
		empName : req.body.empName,
		empEmail : req.body.empEmail,
		empMobile: req.body.empMobile,
		empDob:req.body.empDob
    };
		
	//console.log('staff===',staff)	
		
    updateEmployee= await Employee.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updateEmployee);
  } catch (err) {
    console.log(err);
  }
	
  
});


module.exports = router