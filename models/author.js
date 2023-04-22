const mongoose = require("mongoose");
const Book = require("./book");

const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

authorSchema.pre("deleteOne", { document: true }, async function (next) {
	const counted = await Book.count({ author: this.id });
	console.log(counted);

	if (counted > 0) {
		console.log("Error");
		next(new Error("This author has books still"));
	} else {
		console.log("success");
		next();
	}
});



module.exports = mongoose.model("Author", authorSchema);
