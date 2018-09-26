const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 4000;

var app = express();

app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = (`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log.');
        }
    });
    next(); 
});
//app.use((req, res, next) => {
//    res.render('maintenance.hbs', {
//        pageTitle: 'Maintenance Ongoing',
//    });
//    console.log('Maintenance ongoing');
//});


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.send({
        name: 'Eric',
        likes: [
            'Rock',
            'Biking',
            'Music',
        ]
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitle: 'Project Page',
        welcomeMessage: 'No projects to be shown'
    });
});

app.get('/home', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my house!',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Oh snap! An error occured.',
    });
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});