import express from "express";
import router from "./routes/user.routes";
import bodyParser from 'body-parser';
import cors  from 'cors';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors())

app.use("/", router);
module.exports = {
  path: "/api",
  handler: app,
};
