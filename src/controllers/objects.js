// controllers/objects.js
const fs = require('fs');
const path = require('path');
const fileUtils = require('../utility/fileUtils');

const listObjects = (req, res) => {
    const bucket = req.params.bucket; // Get the bucket name from the URL parameter
    const folderPath = path.join('src/uploads', bucket);
    const files = fileUtils.getFiles(folderPath);
    res.json(files); // Send the list of objects as a JSON response
};

const getObject = (req, res) => {
    const bucket = req.params.bucket;
    const name = req.params.name;
    const filePath = path.join('src/uploads', bucket, name);
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading object');
            } else {
                res.set({
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': `attachment; filename=${name}`,
                });
                res.send(data);
            }
        });
    } else {
        console.log('File not found:', filePath);
        res.status(404).send('Object not found');
    }
};


const putObject = (req, res) => {
    const bucket = req.params.bucket; // Get the bucket name from the URL parameter
    const name = req.params.name; // Get the object name from the URL parameter
    const file = req.file; // Get the uploaded file data from the request
    const originalName = file.originalname; // Get the original filename
    const extension = path.extname(originalName); // Get the file extension
    const newFileName = name + extension; // Combine the object name and file extension to create the new filename
    const bucketPath = path.join('src/uploads', bucket); // Assumes the objects are stored in the uploads directory under the bucket's name
    const filePath = path.join(bucketPath, newFileName);
    
    if (!fs.existsSync(bucketPath)) {
        res.status(404).send(`Bucket ${bucket} not found`); // Send a 404 response if the bucket doesn't exist
        return;
    }
    
    fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error uploading object'); // Send a 500 response if there's an error uploading the object
        } else {
            res.send('Object uploaded successfully'); // Send a success response if the object is uploaded successfully
        }
    });
};


const deleteObject = (req, res) => {
    const bucket = req.params.bucket; // Get the bucket name from the URL parameter
    const name = req.params.name; // Get the object name from the URL parameter
    const filePath = path.join('src/uploads', bucket, name); // Assumes the objects are stored in the uploads directory under the bucket's name
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('Object not found'); // Send a 404 response if the object can't be found
        } else {
            res.send('Object deleted successfully'); // Send a success response if the object is deleted successfully
        }
    });
};

const putObjects = async (req, res) => {
    const bucket = req.params.bucketName;
    // const names = req.body.names; // Array of object names
    const files = req.files; // Array of uploaded files
  
    const bucketPath = path.join('src/uploads', bucket);
  
    if (!fs.existsSync(bucketPath)) {
      res.status(404).send(`Bucket ${bucket} not found`);
      return;
    }
  
    // Write each file to the file system
    const promises = files.map((file, index) => {
      const originalName = file.originalname;
      // const extension = path.extname(originalName);
      // const newFileName = names[index] + extension;
      const newFileName = originalName;
      const filePath = path.join(bucketPath, newFileName);
      return fs.promises.writeFile(filePath, file.buffer);
    });
  
    try {
      await Promise.all(promises);
      res.send('Objects uploaded successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error uploading objects');
    }
  };
module.exports = {
    listObjects: listObjects,
    getObject: getObject,
    putObject: putObject,
    deleteObject: deleteObject,
    putObjects : putObjects
};
