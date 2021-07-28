const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


//express app
dotenv.config();
const app = express();

//connect to mongo db
const dbURI = `mongodb+srv://mnmdev:${process.env.MONGO_PASSWORD}@nodeblog.caikp.mongodb.net/mnmBlog?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));
//register view engine
app.set('view engine', 'ejs');

//listen for requests


//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.use((req,res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.get('/', (req,res) => {
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About'
    })
});

//blog routes
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt: -1})
    .then(result => {
        res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch(err => console.log(err));
})

app.get('/blogs/create', (req,res) => {
    res.render('create', {
        title: 'Create Blog'
    });
})

//404 page
//Use fires for every request and only executes if there isn't a match that comes before
app.use((req,res) => {
    res.status(404).render('404', {
        title: '404 Not Found'
    });
})
