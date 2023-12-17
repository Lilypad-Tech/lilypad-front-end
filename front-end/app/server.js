// Express is a framework for APIs.
const express = require('express');
// Cors will allow our browser to interact with our command line.
const cors = require('cors');
// Here we are importing our cli wrapper we just created
const { runCliCommand } = require('./pages/api/cliWrapper');
// Create an instance of Express to set up the server
const app = express();
// Define the port number on which the server will listen
const port = 3001;

// Enable CORS middleware to handle cross-origin requests
app.use(cors());
// Use express.json middleware to parse JSON requests
app.use(express.json());
// Use express.urlencoded middleware to handle URL-encoded data (useful for form submissions)
app.use(express.urlencoded({ extended: true }));

// Here we will serve images from the directory Lilypad saves files to/
app.use('/images', express.static('/tmp/lilypad/data/downloaded-files'));

// When a user submits their prompt, this will run our CLI Wrapper with their prompt.
app.post('/api/cliWrapper', (req, res) => {
    // Grab the user's input
    const userInput = req.body.userInput;
    // Run our CLI Wrapper with their input
    runCliCommand(userInput, (error, filePath) => {
        if (error) {
            return res.status(500).send('Error processing command');
        }
        // Convert file path to URL
        const urlPath = filePath.replace('/tmp/lilypad/data/downloaded-files', '');
        // Send the URL where the result can be accessed
        res.send(`http://localhost:${port}/images${urlPath}`);
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});