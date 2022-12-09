require("dotenv").config();
require("express-async-errors");
const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const app = express();

//connect DB
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

app.use(express.json());
//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

//error handler and not found
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
