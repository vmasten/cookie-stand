'use strict';


function Stores(name, minCustomers, maxCustomers, salesAvg) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.salesAvg = salesAvg;
}

Stores.prototype.hourlyCustomers = function() {
  var min = Math.ceil(this.minCustomers);
  var max = Math.floor(this.maxCustomers);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


//A simple function to get the cookies per hour; probably should be moved into each object
Stores.prototype.cookiesPerHour = function() {
  return Math.round(this.hourlyCustomers() * this.salesAvg);
};


/* Uses cookiesPerHour to build an array of sales by hour (including a total for the day)
and inserts the results into an unordered list in sales.html */

Stores.prototype.cookiesPerDay = function(hours) {
  var arr = [], workingTotal = 0, total = 0, currentHour = 6;
  for (var i = 0; i < hours; i++) {
    if (currentHour < 12) { //morning
      workingTotal = this.cookiesPerHour();
      arr.push(currentHour + ' am: ' + workingTotal + ' cookies');
    }
    else if (currentHour === 12) { //noon
      workingTotal = this.cookiesPerHour();
      arr.push(currentHour + ' pm: ' + workingTotal + ' cookies');
    } else { //evening
      workingTotal = this.cookiesPerHour();
      arr.push((currentHour - 12) + ' pm: ' + workingTotal + ' cookies');
    }
    total += workingTotal; //tracks the total cookies sold
    currentHour++;
  }
  arr.push('Total: ' + total + 'cookies');

  //Store name
  var h2El = document.createElement('h2');
  h2El.textContent = this.name;
  //Displays an unordered list of the array elements
  var ulEl = document.createElement('ul');
  for (var j = 0; j < arr.length; j++) {
    var liEl = document.createElement('li');
    liEl.textContent = arr[j];
    ulEl.appendChild(liEl);
  }
  var sales = document.getElementById('locations');
  sales.appendChild(h2El);
  sales.appendChild(ulEl);
};

var pike = new Stores('1st and Pike', 23, 65, 6.3);


// //Store objects
// var firstAndPike = {
//   name: '1st and Pike',
//   minCustomers: 23,
//   maxCustomers: 65,
//   cookieSalesAverage: 6.3,
//   cookiesArray: [],
//   hourlyCustomers: function() {
//     var min = Math.ceil(this.minCustomers);
//     var max = Math.floor(this.maxCustomers);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
// };

// var seaTacAirport = {
//   name: 'SeaTac Airport',
//   minCustomers: 3,
//   maxCustomers: 24,
//   cookieSalesAverage: 1.2,
//   cookiesArray: [],
//   hourlyCustomers: function() {
//     var min = Math.ceil(this.minCustomers);
//     var max = Math.floor(this.maxCustomers);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
// };

// var seattleCenter = {
//   name: 'Seattle Center',
//   minCustomers: 11,
//   maxCustomers: 38,
//   cookieSalesAverage: 3.7,
//   cookiesArray: [],
//   hourlyCustomers: function() {
//     var min = Math.ceil(this.minCustomers);
//     var max = Math.floor(this.maxCustomers);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
// };

// var capitolHill = {
//   name: 'Capitol Hill',
//   minCustomers: 20,
//   maxCustomers: 38,
//   cookieSalesAverage: 2.3,
//   cookiesArray: [],
//   hourlyCustomers: function() {
//     var min = Math.ceil(this.minCustomers);
//     var max = Math.floor(this.maxCustomers);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
// };

// var alki = {
//   name: 'Alki',
//   minCustomers: 2,
//   maxCustomers: 16,
//   cookieSalesAverage: 4.6,
//   cookiesArray: [],
//   hourlyCustomers: function() {
//     var min = Math.ceil(this.minCustomers);
//     var max = Math.floor(this.maxCustomers);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
// };

/* I wasn't sure if some stores may have variable hours in the future, which is why I pass in
hours to the function; additional work will be needed if stores have variable opening times */
pike.cookiesPerDay(15);

