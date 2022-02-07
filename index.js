const express = require("express");
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express()

app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = "mongodb+srv://locationDb:EL5eKr5vxDHc19VG@cluster0.kizi4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)

async function run() {

    try {
        await client.connect();

        const database = client.db("destinationDb");
        const destinationCollection = database.collection("cities")

        app.get("/destinations", async (req, res) => {
            const cursor = destinationCollection.find({})

            const allCities = await cursor.toArray();

            res.send(allCities)


        })
    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Server is live ")
});

app.listen(port, () => {
    console.log("port to listening at ", port)
})