# Lilypad front end
This repository can be used as a starting point to create your own custom front end for a Lilypad network module. The front end is set to run with the SDXL module but can be modified to be used for any other module. 

## Install Node packages
``
npm install
``

``
npm install dotenv
``

``
npm install express
``

``
npm install cors
``

## Adding your private key

To run jobs, you will need to provide the private key for the wallet that will be charged for each job. Create a .env file in the project folder. Paste in the following and replace <your-private-key-here>.

``
WEB3_PRIVATE_KEY=<your-private-key-here>
``

## Running your front end

Open two terminals and navigate to your app folder in both terminals. In one terminal start your server.

``
node server.js
``

In the other terminal run your front end.

``
npm run dev
``

Open your browser and navigate to http://localhost:3000/ to view your front end.