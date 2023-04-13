# Simple Node.js S3 API

This is a simple Node.js web service that provides basic operations for an S3-like object storage system. The web service allows you to perform the following operations:

- create buckets 
- List buckets
- List objects in a bucket
- Get an object
- Put an object
- Delete an object

This project was created as an example of how to implement a basic S3-like API in Node.js. It does not use the actual AWS S3 service, but instead provides a simple implementation of the necessary functionality.

## Installation

To install and run the web service, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Start the web service by running `npm start`.
4. The web service should now be running at http://localhost:3000.

## Usage


### create Buckets

To create a bucket, send a POST request to `/bucket/:bucketName`.
### List Buckets

To list the available buckets, send a GET request to `/buckets`. The response will be a JSON array of bucket names.

### List Objects

To list the objects in a bucket, send a GET request to `/objects/:bucketName`. Replace `:bucketName` with the name of the bucket you want to list. The response will be a JSON array of object names.

### Get Object

To get the contents of an object, send a GET request to `/objects/:bucketName/:ObjectName`. Replace `:bucketName` with the name of the bucket and `:ObjectName` with the name of the object you want to retrieve. The response will be the contents of the object.

### Put Object

To upload a new object, send a POST request to `/objects/:bucketName/:ObjectName`, where `:bucketName` is the name of the bucket and `:ObjectName` is the name of the object you want to upload. Include the object data as a binary file upload in the request body. The response will be a success message if the object is uploaded successfully.

### Delete Object

To delete an object, send a DELETE request to `/objects/:bucketName/:ObjectName`, where `:bucketName` is the name of the bucket and `:ObjectName` is the name of the object you want to delete. The response will be a success message if the object is deleted successfully.


### Put Objects

To upload multiple  new object, send a POST request to `/objects/:bucketName`, where `:bucketName` is the name of the bucket . Include the object data as a binary file upload in the request body. The response will be a success message if the object is uploaded successfully.

