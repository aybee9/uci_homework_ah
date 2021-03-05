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


// button id
var button = d3.select('#filter-btn');