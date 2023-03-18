require('dotenv').config();

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const api=require('./routes/api');
const PORT=process.env.PORT;

const multer=require('multer');
const bodyParser=require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(multer().array());
app.use('/api',api);

mongoose.connect(process.env.MONGO_URL, ({
    useNewUrlParser:true
}))
const db = mongoose.connection
db.on('error', error=>console.error(error))
db.once('open', ()=> console.log('Connected to database'));

app.listen(PORT, ()=>{
    console.log(`Listening to the port ${PORT}`)
})