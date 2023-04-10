const mongoose = require("mongoose");
const Paragraph = require("./paragraph");

const paraSchema = new mongoose.Schema({
  child: { type: mongoose.ObjectId, ref: "Paragraph" },
});

const pageSchema = new mongoose.Schema({
  children: [paraSchema],
});

const DocSchema = new mongoose.Schema({
  pages: {
    children: [pageSchema],
  },
  file_name: {
    type: String,
    required: [true, "File name not available"],
  },
  title: {
    type: String,
    required: [true, "Title not available"],
  },
  abstract: {
    type: String,
    required: [true, "Abstract not available"],
  },
  image: {
    type: String,
    required: [true, "Image not available"],
  },
  pdf_link: {
    type: String,
    required: [true, "pdf link not available"],
  },
  authors: {
    type: [String],
    required: [true, "Authors not available"],
  },
  keywords: {
    type: [String],
    required: [true, "Keywords not available"],
  },
});

module.exports = mongoose.model("Document", DocSchema);
