const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const root = '/';
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}.`;
    console.log(log);
    fs.appendFile('sever.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get(root, (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my site.'
    });
});

app.get(root+'about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get(root+'404', (req, res) => {
    res.send({
        errorMessage: 'Uh Oh...nothing here!'
    });
});

app.get(root+'projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
        welcomeMessage: 'My Github Projects:'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});
