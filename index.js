const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.skbfv9j.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const productCollection = client.db('emajhon').collection('products')

        app.get('/products', async(req,res) =>{
            const query = {}
            const cursor = productCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(e => console.log(e))


app.get('/',(req,res) =>{
    res.send('Emajhon server is running')
})


app.listen(port,()=>{
    console.log('Server is running on port',port)
})