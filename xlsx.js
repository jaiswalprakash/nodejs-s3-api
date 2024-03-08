const axios = require('axios');
const excel = require('exceljs');

// Define a function to fetch data from the API and convert it to an Excel file
function fetchAndConvertToExcel(apiUrl, columns, selectedFields, outputFilePath) {
  // Fetch data from the API using Axios
  axios.get(apiUrl)
    .then(response => {
      // Extract the data from the response
      const data = response.data;
      // Create a new workbook and worksheet
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Data');
      
      // Convert the selected fields to an array
      const selectedFieldsArray = selectedFields.split(',');
      // Filter the columns to include only the selected fields
      const filteredColumns = columns.filter(column => selectedFieldsArray.includes(column.key));   
      // Add the filtered columns to the worksheet
      worksheet.columns = filteredColumns;

      // Add the data to the worksheet
      worksheet.addRows(data);

      // Save the workbook as an Excel file
      workbook.xlsx.writeFile(outputFilePath)
        .then(() => {
          console.log('File saved successfully.');
        })
        .catch(error => {
          console.log('Error saving file:', error);
        });
    })
    .catch(error => {
      console.log('Error fetching data:', error);
    });
}

// Example usage
const apiUrl ='https://jsonplaceholder.typicode.com/users';
const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Phone', key: 'phone' },
];
const selectedFields = 'name,email,phone';
const outputFilePath = 'data.xlsx';

fetchAndConvertToExcel(apiUrl, columns, selectedFields, outputFilePath);
