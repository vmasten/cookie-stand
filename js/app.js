'use strict';

var firstAndPike = {
  minCustomers: 23,
  maxCustomers: 65,
  cookieSalesAverage: 6.3,
  hourlyCustomers: function() {
    return Math.floor(Math.random() * (this.minCustomers - this.maxCustomers + 1)) + this.minCustomers;
  }

};

var cookiesPerHour = function(cookies, customers) {
  return cookies * customers;
};

var cookiesPerDay = function(hours) {
  var currentHour = 6;
  var arr = [];
  for (var i = 0; i < hours; i++) {
    if (currentHour < 12) {
      arr.push(currentHour + ' am: ' + cookiesPerHour(firstAndPike.cookieSalesAverage, firstAndPike.hourlyCustomers()) + ' cookies');
    }
    else if (currentHour === 12) {
      arr.push(currentHour + ' pm: ' + cookiesPerHour(firstAndPike.cookieSalesAverage, firstAndPike.hourlyCustomers()) + ' cookies');
    } else {
      arr.push((currentHour - 12) + ' pm: ' + cookiesPerHour(firstAndPike.cookieSalesAverage, firstAndPike.hourlyCustomers()) + ' cookies');
    }
    currentHour++;
  }
  return arr;
};

console.log(cookiesPerHour(firstAndPike.cookieSalesAverage, firstAndPike.hourlyCustomers()));
console.log(cookiesPerDay(14, cookiesPerHour(firstAndPike.cookieSalesAverage, firstAndPike.hourlyCustomers())));