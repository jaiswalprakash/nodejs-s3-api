// controllers/buckets.js
const fileUtils = require('../utility/fileUtils');
const fs = require('fs');
const path = require('path');

const createBuckets = (req, res) => {
    const bucket =  req.params.bucketName; // Get the bucket name from the URL parameter
    const filePath = path.join('src/uploads', bucket); 
    // Create the new folder if it doesn't already exist
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
        res.status(200).send(`Created new folder: ${bucket}`);
    } else {
        res.status(400).send(`Folder ${bucket} already exists`);
    }
};
const listBuckets = (req, res) => {
    // Path to the folder you want to list subdirectories for
    const folderPath = path.join('src/uploads');
    const subdirectories = fileUtils.getSubdirectories(folderPath);
    res.json(subdirectories); // Send the list of buckets as a JSON response
};

module.exports = { listBuckets, createBuckets};
