// from data.js
var tableData = data; 
var tdata = d3.select("tbody"); 

// YOUR CODE HERE!

// retrieving values 
tableData.forEach(item => {
    var row = tdata.append('tr');
    Object.entries(item).forEach(([key, value]) => {
        var cell = row.append('td');
        cell.text(value);
    })
})


// Use a date form in your HTML document and write JavaScript code 
// that will listen for events and search through the date/time 
// column to find rows that match user input.