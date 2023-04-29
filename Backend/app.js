require("dotenv").config();
require("express-async-errors");
const path = require("path");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

// const authenticateUser = require("./middleware/authentication");
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(fileUpload());

// routers
const authRouter = require("./routes/auth");
const docsRouter = require("./routes/documents");
const newDocRouter = require("./routes/newDocument");
const allowedUsers = require("./routes/allowedUsers");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.send("<h1>Research Papers Management API</h1>");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/docs", docsRouter);
app.use("/api/v1/newDoc", authenticateUser, newDocRouter);
app.use("/api/v1/access", authenticateUser, allowedUsers);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
