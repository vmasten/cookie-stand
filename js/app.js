'use strict';

var firstAndPike = {
  name: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  cookieSalesAverage: 6.3,
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
  hourlyCustomers: function() {
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

var cookiesPerHour = function(location) {
  return Math.round(location.hourlyCustomers() * location.cookieSalesAverage);
};

var cookiesPerDay = function(hours, location) {
  var workingTotal = 0, total = 0, currentHour = 6, arr = [];
  for (var i = 0; i < hours; i++) {
    if (currentHour < 12) {
      workingTotal = cookiesPerHour(location);
      arr.push(currentHour + ' am: ' + workingTotal + ' cookies');
    }
    else if (currentHour === 12) {
      workingTotal = cookiesPerHour(location);
      arr.push(currentHour + ' pm: ' + workingTotal + ' cookies');
    } else {
      workingTotal = cookiesPerHour(location);
      arr.push((currentHour - 12) + ' pm: ' + workingTotal + ' cookies');
    }
    total += workingTotal;
    currentHour++;
  }
  arr.push('Total: ' + total + 'cookies');

  var h2El = document.createElement('h2');
  h2El.textContent = location.name;
  var ulEl = document.createElement('ul');
  for (var j = 0; j < arr.length; j++) {
    var liEl = document.createElement('li');
    liEl.textContent = arr[j];
    ulEl.appendChild(liEl);
  }
  var test = document.getElementById('locations');
  test.appendChild(h2El);
  test.appendChild(ulEl);
};

cookiesPerDay(15, firstAndPike);
cookiesPerDay(15, seaTacAirport);
cookiesPerDay(15, seattleCenter);
