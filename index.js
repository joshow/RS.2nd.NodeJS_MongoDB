// npm install express 4.17.1 --save
// npm instal mongoose 5.9.7 --save

const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin_joshow:admin_joshow@rs2nodejs-bifa3.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err))


app.get('/', (req, res) => res.send('HelloWord! Welcome to Node js~'))
app.listen(port, () => console.log(`Example app listening port ${port}!`)) 