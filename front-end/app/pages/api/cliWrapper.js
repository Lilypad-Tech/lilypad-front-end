// Dotenv will allow us to access our environment variables so we can access our private key.
require('dotenv').config({ path: __dirname + '/../../../.env' });

// This will allow us to run code in our CLI.
const { exec } = require('child_process');

// The function we will call on the front end, to run a lilypad job.
function runCliCommand(userInput, callback) {
    console.log("Lilypad Starting...");
    // Ensure the WEB3_PRIVATE_KEY environment variable is set
    const web3PrivateKey = process.env.WEB3_PRIVATE_KEY;
    // If the private key was not set up properly, we should expect to see this error.
    if (!web3PrivateKey) {
        console.error('WEB3_PRIVATE_KEY is not set in the environment variables.');
        return;
    }

    // This command will first export our private key, and then run the Lilypad SDXL module with the prompt provided by the user.
    const command = `export WEB3_PRIVATE_KEY=${web3PrivateKey} && lilypad run sdxl:v0.9-lilypad1 -i PromptEnv="PROMPT=${userInput}"`;

    // This is a callback function to handle any errors when calling runCliCommand function.
    exec(command, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return callback(error);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return callback(stderr);
        }

        // When Lilypad runs successfully, it returns the relative path to the files it generated, and the IPFS url. Here we are grabbing the relative path in local storage to serve the image to our front end.
        const lines = stdout.trim().split('\n');
        const path = lines[lines.length - 4].trim(); // Trim any extra whitespace
        const filePath = path.replace('open ', '') + '/outputs/image-42.png';
        
        // This console log will confirm that Lilypad ran successfully.
        console.log(stdout)

        // This will return our output to the front end.
        if (callback) {
            callback(null, filePath);
        }
    });
}

module.exports = { runCliCommand };