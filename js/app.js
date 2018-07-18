'use strict';

//Used later to build the table
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'], openHours = 14, tblEl;

function Stores(name, minCustomers, maxCustomers, salesAvg) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.salesAvg = salesAvg;
}

//Simulates a random amount of customers per hour based on min and MaxCustomers
Stores.prototype.hourlyCustomers = function() {
  var min = Math.ceil(this.minCustomers);
  var max = Math.floor(this.maxCustomers);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


//A simple function to get the cookies per hour; probably should be moved into each object
Stores.prototype.cookiesPerHour = function() {
  return Math.round(this.hourlyCustomers() * this.salesAvg);
};


//Uses cookiesPerHour to build an array of sales by hour (including a total for the day)
Stores.prototype.cookiesPerDay = function(hours) {
  var arr = [], workingTotal = 0, total = 0;
  for (var i = 0; i < hours; i++) {
    workingTotal = this.cookiesPerHour();
    arr.push(workingTotal);
    total += workingTotal; //tracks the total cookies sold
  }
  arr.push(total);
  return arr;
};

//Uses the array built by cookiesPerDay to write the data to a table
Stores.prototype.render = function(hours) {
  var arr = this.cookiesPerDay(hours);
  var trEl = document.createElement('tr');
  var title = document.createElement('th');
  title.textContent = this.name;
  trEl.appendChild(title);
  for (var idx in arr) {
    var tdEl = document.createElement('td');
    tdEl.textContent = arr[idx];
    trEl.appendChild(tdEl);
  }
  var sales = document.getElementById('locations');
  sales.appendChild(trEl);

};

//Sets up the first row of the table. Name was not intended to be cute
//but couldn't bring myself to change it
var tableSet = function() {
  tblEl = document.createElement('table');
  var h2El = document.createElement('h2');
  h2El.textContent = 'Cookies Needed By Location Each Day';
  document.getElementById('locations').appendChild(h2El);

  var trEl = document.createElement('tr');
  var blankEl = document.createElement('th');
  blankEl.textContent = '';
  trEl.appendChild(blankEl);

  for (var idx in hours) {
    var thEl = document.createElement('th');
    thEl.textContent = hours[idx];
    trEl.appendChild(thEl);
  }
  var total = document.createElement('th');
  total.textContent = 'Daily Location Total';
  trEl.appendChild(total);

  var sales = document.getElementById('locations');
  sales.appendChild(trEl);
  sales.appendChild(tblEl);

};

//Object instantiation
var pike = new Stores('1st and Pike', 23, 65, 6.3);
var seaTac = new Stores('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Stores('Seattle Center', 11, 38, 3.7);
var capHill = new Stores('Capitol Hill', 20, 38, 2.3);
var alki = new Stores('Alki', 2, 16, 4.6);

//Table building
tableSet();
pike.render(openHours);
seaTac.render(openHours);
seattleCenter.render(openHours);
capHill.render(openHours);
alki.render(openHours);

/* I wasn't sure if some stores may have variable hours in the future, which is why I (still) pass in hours to the function; additional work will be needed if stores have variable opening times */

//Some things to refactor:

//for var store of allStores
//store.render()

//var tblEl = document.createElement('table');
//document.getElementById('main-content').appendChild(tblEl);

