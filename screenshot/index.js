const express = require('express');

const api = {};

api.router = () => {
  let router = express.Router();
  router.get('/store', api.routes.getStore);
  return router;
}

api.routes = {};

api.routes.getStore = (req, res) => {
  const exceptions = [
    //'15/03/2022'
  ];
  const date = new Date();
  const weekday = date.toLocaleString('en-gb', { timeZone: 'Europe/Lisbon', weekday: 'short' });
  let store = {
    closingDay: weekday == 'Tue',
    date: date.toLocaleDateString('en-gb', { timeZone: 'Europe/Lisbon' }),
    exceptionallyClosed: exceptions.includes(date.toLocaleDateString('en-gb', { timeZone: 'Europe/Lisbon' })),
    hours: date.toLocaleString('en-gb', { timeZone: 'Europe/Lisbon', hour: '2-digit' }),
    minutes: date.toLocaleString('en-gb', { timeZone: 'Europe/Lisbon', minute: '2-digit' }),
    seconds: date.toLocaleString('en-gb', { timeZone: 'Europe/Lisbon', second: '2-digit' })
  };
  let time = store.hours + store.minutes;
  if (((time > '1159' && time < '1441') || (time > '1859' && time < '2241')) && weekday != 'Tue' && !store.exceptionallyClosed) {
    store.open = true;
  } else {
    store.open = false;
  }
  res.json(store);
}

module.exports = api;