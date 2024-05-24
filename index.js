const express =  require('express');
const { crawlRoute } = require('./routes/crawlRoute');
const { newRequest } =  require('./middleware/logsMiddleware');
const { adminRoute } = require('./routes/adminRoute');
const app =  express();
const port =  3000 ;
require('./config/connection');



app.use(express.json());
app.use(newRequest);
app.use('/crawl' , crawlRoute);
app.use('/admin' , adminRoute);




app.get('/' , (req , res)=> {
       res.send({ message: "working properly "});
});




app.listen(port , ()=> console.log("app is running on port " , port));