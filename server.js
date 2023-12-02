// app.js
const express = require('express');
const path = require('path');
const fs=require('fs');

const app = express();
const port = 9595;

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index_new.html');
});

app.get('/getData', (req, res) => {
    fs.readFile('products.html', 'utf8', (err, fileContent) => {
        res.send(fileContent);
    });
});
app.post('/postData', (req, res) => {
    // console.log(fs);
    fs.appendFile('products.html','<div><p>This is testing</p></div>', 'utf8', (err, fileContent) => {
        console.log(fileContent);
    });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
