const express = require('express');
const hbs = require("hbs");
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperCase', (text) => {
    return text.toUpperCase();
})

app.use(express.static(__dirname + ('/public')));
app.set('view engine', 'hbs');

//midle ware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('offline.hbs');
})

app.get('/', (req, res) => {
    res.render( 'home.hbs',{
        // name: 'Afshin',
        // family: 'Jian',
        // age :53
        pageTitle: 'Main Page',
        welcomeMessage: 'Welcome to NodeJs',
        
    })

});
app.get('/about', function (req, res) {
    res.render('about.hbs', {
        pageTitle: 'About Us',
        
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: "Unable to fetch data"
    });
});
app.listen(3000, function () {
    console.log('server listening to port : 3000');
});
