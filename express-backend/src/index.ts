import express from 'express';

import { createClient } from 'redis';

const client = createClient();

const app = express();
app.use(express.json());


app.post('/submit', async (req, res) => {

    try {
        
  
    const {problemId, userId, code, language} = req.body;

   await client.lPush('submissions', JSON.stringify({problemId, userId, code, language}));
    
    res.status(200).json({message: 'Submission received'});

      } catch (error) {
        return res.status(500).json({message: 'Submission failed'});
    }


})




// start the server and connect to Redis
async function startServer() {

    try {
        await client.connect();
        console.log('Connected to Redis');

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }

}

startServer();