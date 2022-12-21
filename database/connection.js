const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("Database Connected Successfully"))
.catch(err=>console.log(err))