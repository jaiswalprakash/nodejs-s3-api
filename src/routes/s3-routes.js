// routes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { listBuckets, createBuckets } = require('../controllers/buckets');
const { listObjects, getObject, putObject, deleteObject,putObjects } = require('../controllers/objects');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Define routes and their corresponding controller functions
router.post('/bucket/:bucketName', createBuckets); // Route to create  bucket 

router.get('/buckets', listBuckets); // Route to list all buckets

router.get('/objects/:bucketName', listObjects); // Route to list all objects in a bucket

router.get('/objects/:bucketName/:ObjectName', getObject); // Route to get a specific object from a bucket

router.post('/objects/:bucketName/:ObjectName', upload.single('file'), putObject); // Route to upload a new object to a bucket

router.delete('/objects/:bucketName/:ObjectName', deleteObject); // Route to delete an object from a bucket

router.post('/objects/:bucketName', upload.array('files'), putObjects); //  Route to upload multiple new object to a bucket

module.exports = router; // Export the router object for use in other modules
