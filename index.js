
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8080;
const HOST = "127.0.0.1";

app.use(express.json());
app.use(cookieParser());

let name = '';

app.get('/login/:name', (req, res) => {
    const opts ={
        httpOnly: true,
        secure: false
    }
    name = req.params.name;
    console.log(`User ${name} attempting login.`);
    res.cookie('loginCookie', {"userName": name}, opts);
    res.end();
})

app.get('/hello', (req, res)=>{
    const cookieObj = req.cookies.loginCookie;
    console.table(cookieObj.userName);
    res.status(200);
    res.send(`Hello ${cookieObj.userName}`)
    console.log(cookieObj.userName);
})


app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));