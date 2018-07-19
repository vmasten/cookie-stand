'use strict';

//Used later to build the table
var allStores = [];
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'], tblEl;

function Store(name, minCustomers, maxCustomers, salesAvg) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.salesAvg = salesAvg;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.dailyTotal = 0;

  allStores.push(this);
}

//Simulates a random amount of customers per hour based on min and MaxCustomers
Store.prototype.hourlyCustomers = function() {
  var min = Math.ceil(this.minCustomers);
  var max = Math.floor(this.maxCustomers);
  for (var i = 0; i < hours.length; i++) {
    this.customersPerHour.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
};

//Multiplies customers per hour by average sales to get an hourly sales figure
Store.prototype.hourlySales = function() {
  this.hourlyCustomers();
  for (var hour in hours) {
    this.cookiesPerHour.push(Math.round(this.customersPerHour[hour] * this.salesAvg));
  }
};

//Uses hourlySales to track cookies sold for the day
//pushes hourly sales to an array and tracks total sales
Store.prototype.cookiesPerDay = function() {
  this.hourlySales();

  for (var customers in this.cookiesPerHour) {
    this.dailyTotal += this.cookiesPerHour[customers];

  }
};

//Renders tabular data for each store to <table> in sales.html
Store.prototype.render = function() {
  this.cookiesPerDay();
  var trEl = document.createElement('tr');
  var title = document.createElement('th');
  title.textContent = this.name;
  trEl.appendChild(title);

  for (var hour in hours) {
    var tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesPerHour[hour];
    trEl.appendChild(tdEl);
  }

  var tdTotalEl = document.createElement('td');
  tdTotalEl.textContent = this.dailyTotal;
  trEl.appendChild(tdTotalEl);
  tblEl.appendChild(trEl);

};

//standalone function used by footer() to sum all cookie
//sales per hour
var totalsByHour = function(storeArray) {
  var arr = [], runTotal = 0;
  for (var hour in hours) {
    for (var store in storeArray) {
      runTotal += storeArray[store].cookiesPerHour[hour];
    }
    arr.push(runTotal);
    runTotal = 0;
  }
  return arr;
};

//Sets up the first row of the table. Name was not intended to be cute
//but couldn't bring myself to change it
var tableSet = function() {
  tblEl = document.createElement('table');
  tblEl.setAttribute('id', 'table');
  var h2El = document.createElement('h2');
  h2El.textContent = 'Cookies Needed By Location Each Day';

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
  tblEl.appendChild(trEl);

  document.getElementById('locations').appendChild(h2El);
  document.getElementById('locations').appendChild(tblEl);

};

//Builds the last row of the table with hourly sales totals
var footer = function() {
  //if a footer already exists, kill it with fire. Thanks, Dmitry!
  if (document.getElementsByTagName('tfoot') !== undefined) {
    document.getElementById('table').deleteTFoot();
  }
  var arr = totalsByHour(allStores);
  var tfoot = document.createElement('tfoot');
  tfoot.textContent = 'Totals';
  for (var index in arr) {
    var tdfoot = document.createElement('td');
    tdfoot.textContent = arr[index];
    tfoot.appendChild(tdfoot);
  }
  tblEl.appendChild(tfoot);
};

//Creates a form for adding new stores
var formEl = document.getElementById('main-form');
formEl.addEventListener('submit', function(event) {
  event.preventDefault();

  var name = event.target.name.value;
  var minCust = event.target.minCustomers.value;
  var maxCust = event.target.maxCustomers.value;
  var salesAvg = event.target.salesAvg.value;

  new Store(name, minCust, maxCust, salesAvg).render();
  footer();
});

var renderStores = function() {
  for (var store of allStores) {
    store.render();
  }
};

//Initial object instantiation
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

//Table building
tableSet();
renderStores();
footer();

