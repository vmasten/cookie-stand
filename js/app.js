'use strict';

var firstAndPike = {
  minCustomers: 23,
  maxCustomers: 65,
  cookieSalesAverage: 6.3,
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
  var currentHour = 6;
  var arr = [];
  for (var i = 0; i < hours; i++) {
    if (currentHour < 12) {
      arr.push(currentHour + ' am: ' + cookiesPerHour(location) + ' cookies');
    }
    else if (currentHour === 12) {
      arr.push(currentHour + ' pm: ' + cookiesPerHour(location) + ' cookies');
    } else {
      arr.push((currentHour - 12) + ' pm: ' + cookiesPerHour(location) + ' cookies');
    }
    currentHour++;
  }
  return arr;
};

console.log(cookiesPerDay(15, firstAndPike));
