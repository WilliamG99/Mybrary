const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

// All Authors Route
router.get("/", async (req, res) => {
	let searchOptions = {};
	if (req.query.name != null && req.query.name !== "") {
		searchOptions.name = new RegExp(req.query.name, "i");
	}
	try {
		const authors = await Author.find(searchOptions);
		res.render("authors/index", {
			authors: authors,
			searchOptions: req.query,
		});
	} catch {
		res.redirect("/");
	}
});

// New Author Route
router.get("/new", (req, res) => {
	res.render("authors/new", { author: new Author() });
});

// Create Author Route
router.post("/", async (req, res) => {
	const author = new Author({
		name: req.body.name,
	});
	try {
		const newAuthor = await author.save();
		//res.redirect(`authors/${newAuthor.id}`)
		res.redirect("/authors");
	} catch {
		res.render("authors/new", {
			author: author,
			errorMessage: "Error creating Author",
		});
	}
});

//Show Author
router.get("/:id", async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        const books = await Book.find({ author: author.id }).limit(6).exec();
        res.render("authors/show", { 
            author: author,
            booksByAuthor: books
            });
    }
    catch (err){
        console.log(err);
        res.redirect("/");
    }
	//console.log(req.params.id);
    //res.send("Author ID: " + `/authors/${req.params.id}`);
});

//Edit Author
router.get("/:id/edit", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);
		res.render("authors/edit", { author: author });
	} catch {
		res.redirect("/authors");
	}
});

//Add Author
router.put("/:id", async (req, res) => {
	let author;
	try {
		author = await Author.findById(req.params.id);
		author.name = req.body.name;
		await author.save();
		res.redirect(`/authors/${author.id}`);
	} catch {
		if (author == null) {
			res.redirect("/");
		} else {
			res.render("authors/edit", {
				author: author,
				errorMessage: "Error updating Author",
			});
		}
	}
});

//Delete Author
router.delete("/:id", async (req, res) => {
	let author = await Author.findOne({ _id: req.params.id });
	try {
		console.log("In Try b4 .deleteOne");
		await author.deleteOne();
		console.log("In Try after .deleteOne");
		res.redirect("/authors");
	} catch {
		if (author == null) {
			console.log("NULL");
			res.redirect("/");
		} else {
			console.log("Error occurred while deleting Person");
			res.redirect(`/authors/${author.id}`);
		}
	}
});

module.exports = router;
