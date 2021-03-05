// from data.js
var tableData = data; 
var tdata = d3.select("tbody"); 

// YOUR CODE HERE!

// retrieving values and to display on site
tableData.forEach(item => {
    var row = tdata.append('tr');
    Object.entries(item).forEach(([key, value]) => {
        var cell = row.append('td');
        cell.text(value);
    })
})


// filter based on user input 
// d3 > 09-par-form-filter hw reference

var button = d3.select("#filter-btn");
button.on("click", function() {  
    
    tdata.html(" ");
 
    // select input element and get value property from input element
    var inputElement = d3.select("#datetime");     
    var inputValue = inputElement.property("value"); 
 
    console.log(inputValue); 
    console.log(tableData); 
 
    // filter based on user input 
    var filterData = tableData.filter(tableData => tableData.datetime === inputValue); 
    console.log(filterData); 
 
    // show results
    filterData.forEach(dateData => { 
        var row = tdata.append("tr"); 
        Object.entries(dateData).forEach(([key, value]) => { 
            var cell = tdata.append("td"); 
            cell.text(value); 
        })
    })
})