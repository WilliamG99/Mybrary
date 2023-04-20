const express = require('express');
const router = express.Router();
const Author = require('../models/author');

//All Authors Route
router.get('/', async (req, res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name != ""){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }

    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query 
        });
    } catch{
        res.redirect('/');
    };
});

//New Author Route
router.get('/new', (req, res) =>{
    res.render('authors/new', {author: new Author()});
});

//Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    
    try {
        const newAuthor = await author.save();
        console.log(newAuthor);
        res.redirect(`authors`);
        //res.redirect(`authors/${newAuthor.id}`);
    }
    catch{
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        });
    };


    // author.save()
    // .then(newAuthor => {
    //   console.log(newAuthor);

    //   res.redirect(`authors`);
    // })
    // .catch(err => {
    //   console.log(err);

    //   res.render('authors/new', {
    //     author: author,
    //     errorMessage: 'Error creating author'
    //     })
    // })


});



module.exports = router;