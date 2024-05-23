const express =  require('express');
const { crawlRoute } = require('./routes/crawlRoute');
const { newRequest } =  require('./middleware/logsMiddleware');
const app =  express();
const port =  3000 ;

app.use(express.json());
app.use(newRequest);
app.use('/crawl' , crawlRoute);

app.get('/' , (req , res)=> {
       res.send({ message: "working properly "});
})

app.listen(port , ()=> console.log("app is running on port " , port));