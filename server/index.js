const express = require('express');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-methods', 'GET,POST')
  next();
})

app.get('/imgs/:filename', (req, res) => {
  res.sendFile(resolve(__dirname, './imgs/' + req.params.filename));
})

app.get('/imgs', (req, res) => {
  const imageData = JSON.parse(readFileSync(resolve(__dirname, './data/images.json'), 'utf8'));
    res.send(imageData);
})


app.listen(3000, () => {
  console.log('welcome to use Express on 3000');
})