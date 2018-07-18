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
  for (var hour of hours) {
    this.customersPerHour.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
};


Store.prototype.hourlySales = function() {
  this.hourlyCustomers();
  for (var hour in hours) {
    this.cookiesPerHour.push(Math.round(this.customersPerHour[hour] * this.salesAvg));
  }
};

Store.prototype.cookiesPerDay = function() {
  this.hourlySales();

  for (var customers in this.cookiesPerHour) {
    this.dailyTotal += this.cookiesPerHour[customers];

  }
};

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

var totalsByHour = function(storeArray) {
  var arr = [], runTotal = 0;
  for (var hour in hours) {
    for (var store in storeArray) {
      runTotal = runTotal + storeArray[store].cookiesPerHour[hour];
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
  

  //   var tfEl = document.createElement('tfoot');
  //   tfEl.textContent = 'Totals';
  //   for (var hour in hours) {
  //     for (var hour in hours) {
  //     var totalByHourEl = document.createElement('td')
  //     totalByHourEl.textContent = 
  //   }
  // }
  //tblEl.appendChild(tfEl);

  document.getElementById('locations').appendChild(h2El);
  document.getElementById('locations').appendChild(tblEl);

};

var footer = function() {
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

// //Object instantiation
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

//Table building
tableSet();

for (var store of allStores) {
  store.render();
}

footer();
