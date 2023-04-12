// routes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { listBuckets, createBuckets } = require('../controllers/buckets');
const { listObjects, getObject, putObject, deleteObject } = require('../controllers/objects');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Define routes and their corresponding controller functions
router.post('/buckets/:bucketName', createBuckets); // Route to create  bucket 

router.get('/buckets', listBuckets); // Route to list all buckets

router.get('/objects/:bucket', listObjects); // Route to list all objects in a bucket

router.get('/objects/:bucket/:name', getObject); // Route to get a specific object from a bucket

router.post('/objects/:bucket/:name', upload.single('file'), putObject); // Route to upload a new object to a bucket

router.delete('/objects/:bucket/:name', deleteObject); // Route to delete an object from a bucket

module.exports = router; // Export the router object for use in other modules
