const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// middle-were
app.use(cors())
app.use(express.json())


// first get for tasting
app.get('/', (req, res)=> {
    res.send('This is toy marketplace server')
})

// listing
app.listen(port, () => {
    console.log(`This server is running on: ${port}`)
})

