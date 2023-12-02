// app.js
const express = require('express');
const path = require('path');
const fs=require('fs');
const evtEmitter=require('events');

const evtCalls=new evtEmitter();

evtCalls.on('success',(msg)=>{
    console.log(`server responded with message: ${msg}`);
})


const app = express();
const port = 9595;

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index_new.html');
});

app.get('/getData', (req, res) => {
    var content='';
    const readStream = fs.createReadStream('products.html', 'utf8');

    readStream.on('data',(chunk)=>{
        content+=chunk;
    })
    readStream.on('end',()=>{
        res.send(content);
        // content+=chunk;
    })

    // fs.readFile('products.html', 'utf8', (err, fileContent) => {
    //     res.send(fileContent);
    // });
});
app.post('/postData', async(req, res) => {
    // console.log(fs);
    fs.appendFile('products.html','<div><p>This is testing</p></div>', 'utf8', (err, fileContent) => {
        evtCalls.emit('success','Data entered successfully');
    });
   
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
