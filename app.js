const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const connectToDb = require("./db/connect")

const PORT = process.env.PORT || 5000;

const formRouter = require("./routes/form");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use("/api/form", formRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

const start = async () => {
    try {
        // Connecting to DataBase
        await connectToDb(process.env.MONGODB_URI);
        // Connecting to Server
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
};
// Starts server
start();