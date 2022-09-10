const express = require('express')
const app = express();

const db = require('./db');

app.use(express.json())


app.get('/',function(req,res)
{
		res.send('working');
});


const EmployeeRoute = require('./routes/employeeRoutes');
app.use('/api/employee',EmployeeRoute);


var port=process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {        
res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path  
		});
}



app.listen(port,function(){
	console.log('server start on port=='+ port );
});

