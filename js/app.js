'use strict';

//Store objects
var firstAndPike = {
  name: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  cookieSalesAverage: 6.3,
  cookiesArray: [],
  hourlyCustomers: function() {
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var seaTacAirport = {
  name: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 24,
  cookieSalesAverage: 1.2,
  cookiesArray: [],
  hourlyCustomers: function() {
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var seattleCenter = {
  name: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  cookieSalesAverage: 3.7,
  cookiesArray: [],
  hourlyCustomers: function() {
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var capitolHill = {
  name: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  cookieSalesAverage: 2.3,
  cookiesArray: [],
  hourlyCustomers: function() {
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var alki = {
  name: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  cookieSalesAverage: 4.6,
  cookiesArray: [],
  hourlyCustomers: function() {
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

//A simple function to get the cookies per hour; probably should be moved into each object
var cookiesPerHour = function(location) {
  return Math.round(location.hourlyCustomers() * location.cookieSalesAverage);
};

/* Uses cookiesPerHour to build an array of sales by hour (including a total for the day)
and inserts the results into an unordered list in sales.html */
var cookiesPerDay = function(hours, location) {
  var workingTotal = 0, total = 0, currentHour = 6;
  for (var i = 0; i < hours; i++) {
    if (currentHour < 12) { //morning
      workingTotal = cookiesPerHour(location);
      location.cookiesArray.push(currentHour + ' am: ' + workingTotal + ' cookies');
    }
    else if (currentHour === 12) { //noon
      workingTotal = cookiesPerHour(location);
      location.cookiesArray.push(currentHour + ' pm: ' + workingTotal + ' cookies');
    } else { //evening
      workingTotal = cookiesPerHour(location);
      location.cookiesArray.push((currentHour - 12) + ' pm: ' + workingTotal + ' cookies');
    }
    total += workingTotal; //tracks the total cookies sold
    currentHour++;
  }
  location.cookiesArray.push('Total: ' + total + 'cookies');

  //Store name
  var h2El = document.createElement('h2');
  h2El.textContent = location.name;
  //Displays an unordered list of the array elements
  var ulEl = document.createElement('ul');
  for (var j = 0; j < location.cookiesArray.length; j++) {
    var liEl = document.createElement('li');
    liEl.textContent = location.cookiesArray[j];
    ulEl.appendChild(liEl);
  }
  var sales = document.getElementById('locations');
  sales.appendChild(h2El);
  sales.appendChild(ulEl);
};

/* I wasn't sure if some stores may have variable hours in the future, which is why I pass in
hours to the function; additional work will be needed if stores have variable opening times */
cookiesPerDay(15, firstAndPike);
cookiesPerDay(15, seaTacAirport);
cookiesPerDay(15, seattleCenter);
cookiesPerDay(15, capitolHill);
cookiesPerDay(15, alki);
