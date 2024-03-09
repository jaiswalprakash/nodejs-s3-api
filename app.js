const express = require('express');
const app = express();
const s3_routes = require('./src/routes/s3-routes');
// Enable parsing of JSON request bodies
app.use(express.json()); 
// Enable parsing of URL-encoded request bodies
app.use(express.urlencoded({ extended: true })); 
// Mount the routes defined in routes.js at the root URL path
app.use('/', s3_routes); 

const fs = require('fs');
const path = require('path');


// Define a route to serve the README file
app.get('/', (req, res) => {
    const readmePath = path.join(__dirname, 'README.md');

    // Read the README file
    fs.readFile(readmePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading README file:', err);
            return res.status(500).send('Internal Server Error');
        }
        // Send the content of the README file as HTML
        res.send(`<pre>${data}</pre>`);
    });
});

app.listen(3000, () => console.log('Server started on port 3000')); // Start the server listening on port 3000
