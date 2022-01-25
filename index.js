const express = require('express')
require('./db/mongoose')
const userRouter = require('./router/user')

const app = express()
const PORT = process.env.PORT || 5000

app.use((req, res, next) => {
    console.log(req.method, req.path);
    //have to call NEXT so that call continues running and doesn't get stuck here
    // if(req.method ==="GET"){
    //   res.send('')
    // }
    next();
  });

app.use(express.json());
app.use(userRouter);



app.listen(PORT, ()=>{
    console.log(`app is live at ${PORT}`);
})