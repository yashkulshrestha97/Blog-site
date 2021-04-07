const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/Articles')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-Override');
const app = express();

const dbURI = 'mongodb+srv://yashcode:Yash12345@nodetuts.tsyyp.mongodb.net/blogsite?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(5000))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'));

app.use('/articles',articleRouter);


app.get('/', async (req,res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {articles : articles})
})

