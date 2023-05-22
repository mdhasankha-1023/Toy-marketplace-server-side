const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middle-were
app.use(cors())
app.use(express.json())


// mongodb connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kgqmoa1.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // DB collection
    const toyCollection = client.db('toyMarketplaceDB').collection('toys');
    const myToysCollection = client.db('toyMarketplaceDB').collection('myToys')
    const categoriesCollection = client.db('categoriesDB').collection('categories');


    // get all toys
    app.get('/toys', async(req, res)=> {
      const cursor = await toyCollection.find().toArray();
      res.send(cursor)
    })

    // get specific toy
    app.get('/toys/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await toyCollection.findOne(query);
      res.send(result)
    })


    // post toy
    app.post('/my-toys', async(req, res)=> {
      const item = req.body;
      const result = await myToysCollection.insertOne(item)
      res.send(result)

    })


    // get my toys use email
    app.get('/my-toys', async(req, res)=> {
      let query = {};
            if (req.query?.seller_email) {
                query = { seller_email: req.query.seller_email }
            }
      const result = await myToysCollection.find(query).toArray()
      res.send(result)
    })

    



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);




// first get for tasting
app.get('/', (req, res)=> {
    res.send('This is toy marketplace server')
})

// listing
app.listen(port, () => {
    console.log(`This server is running on: ${port}`)
})

// await client.connect
// await clent.db

