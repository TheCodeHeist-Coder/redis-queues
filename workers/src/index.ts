import { createClient } from 'redis';

const client = createClient();


async function main() {
    await client.connect();
    while (true) {
        const response = await client.brPop('submissions', 0); // Blocking pop from the 'submissions' list

        console.log('Received submission:', response);

        //actually process the submission here, for now we just log it and wait a bit to simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // send it to the publish-subscribe channel for the frontend to pick up and update the UI
        console.log('Finished processing submission');


      
    }
}

main();