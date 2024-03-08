const fs = require('fs');

function getSubdirectories(folderPath) {
  const fileNames = fs.readdirSync(folderPath);
  const subdirectories = fileNames.filter(fileName => {
    return fs.statSync(`${folderPath}/${fileName}`).isDirectory();
  });
  return subdirectories;
}
const getFiles = (folderPath) => {
    // Get a list of all the files in the folder
    const files = fs.readdirSync(folderPath, { withFileTypes: true });

    // Extract the names of the files from the file objects
    const fileNames = files.filter(file => file.isFile()).map(file => file.name);

    // Return the list of file names
    return fileNames;
};
module.exports = { getSubdirectories , getFiles };