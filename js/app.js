'use strict';

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];

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
  return arr;
};

Stores.prototype.render = function(hours) {
  var arr = this.cookiesPerDay(hours);
  var trEl = document.createElement('tr');
  for (var idx in arr) {
    var thEl = document.createElement('th');
    thEl.textContent = arr[idx];
    trEl.appendChild(thEl);
  }
  var sales = document.getElementById('locations');
  sales.appendChild(trEl);

};

var tableSet = function() {
  var h2El = document.createElement('h2');
  h2El.textContent = 'Cookies Needed By Location Each Day';
  var trEl = document.createElement('tr');
  var blank = document.createElement('th');
  blank.textContent = '            ';
  trEl.appendChild(blank);
  for (var idx in hours) {
    var thEl = document.createElement('th');
    thEl.textContent = hours[idx];
    trEl.appendChild(thEl);
  }
  var sales = document.getElementById('locations');
  sales.appendChild(blank);
  sales.appendChild(h2El);
  sales.appendChild(trEl);

};

var pike = new Stores('1st and Pike', 23, 65, 6.3);
var seaTac = new Stores('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Stores('Seattle Center', 11, 38, 3.7);
var capHill = new Stores('Capitol Hill', 20, 38, 2.3);
var alki = new Stores('Alki', 2, 16, 4.6);
tableSet();
pike.render(14);

/* I wasn't sure if some stores may have variable hours in the future, which is why I pass in
hours to the function; additional work will be needed if stores have variable opening times */
