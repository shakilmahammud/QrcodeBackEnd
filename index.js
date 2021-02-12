const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0oz1r.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors());


const port = 50001;

app.get('/',(req,res)=>{
    res.send('i m shakil')
})


const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("QrCodeGenerator").collection("QrCode");
  // add service
  app.post('/addQrCode',(req,res)=>{
    const code=req.body;
    console.log(code)
    serviceCollection.insertOne(code)
    .then(result => {
        res.send(result.insertedCount > 0);
    })
})
app.get('/qrCode', (req, res) => {
    serviceCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })
//get service
// app.get('/services', (req, res) => {
//     serviceCollection.find({})
//         .toArray((err, documents) => {
//             res.send(documents);
//         })
//     })

console.log("ok")
//   client.close();
});


app.listen(process.env.PORT || port)