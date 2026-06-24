
const express = require('express');
const cors = require('cors');
const port = 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Labib!');
});

const uri = process.env.MONGO_DB_URI;

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
        // Connect the client to the server
        await client.connect();

        const database = client.db("startup_forge");
        const founderCollection = database.collection("founders");

        app.get('/api/rounders', async (req, res) =>{
            const query = {};
            if(req.query.rounderId){
                
            }
        })


        app.post('/api/founders', async (req, res) => {
            try {
                const founder = req.body;
                const result = await founderCollection.insertOne(founder); 
                res.status(201).send(result); 
            } catch (error) {
                console.error("Error inserting founder:", error);
                res.status(500).send({ error: "Failed to insert founder data" });
            }
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});