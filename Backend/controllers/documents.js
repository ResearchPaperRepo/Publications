const Document = require("../models/documents");
const User = require("../models/User");

const { StatusCodes } = require("http-status-codes");
const { spawn } = require("child_process");
const process = require("process");

const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllDocs = async (req, res) => {
  const results = await Document.find({});
  const documents = results.map((doc) => {
    return {
      id: doc["_id"],
      fileName: doc["file_name"],
      title: doc.title,
      authors: doc.authors,
      keywords: doc.keywords,
      image: doc.image,
      pdf_link: doc.pdf_link,
      abstract: doc.abstract,
    };
  });
  res.status(StatusCodes.OK).json({ documents });
};

const getDoc = async (req, res) => {
  const {
    params: { id: DocID },
  } = req;

  const document = await Document.findOne({ _id: DocID });

  res.status(StatusCodes.OK).json({ document: document.pages });
};

const uploadDoc = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Please provide email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("User is not allowed to upload");
  }

  let pdfFile;

  if (!req.files || Object.keys(req.files.data).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  pdfFile = req.files.data;
  fileName = pdfFile.name;
  pythonWorkingDirectory = "../Parser";
  nodeWorkingDirectory = "../Backend";
  pythonMainFile = "main.py";
  uploadPath = "../Parser/" + fileName;
  let dataToSend;

  await pdfFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    console.log("File Uploaded Successfully");
  });

  await process.chdir(pythonWorkingDirectory);

  const python = await spawn("python", [pythonMainFile, fileName]);

  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on("exit", (code) => {
    console.log(`child process exited with code: ${code}`);
  });

  await process.chdir(nodeWorkingDirectory);

  res.status(StatusCodes.OK).json({ upload: true });
};

module.exports = { getAllDocs, getDoc, uploadDoc };
