const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const dbConnection = require("./helpers/dbConnection");
const studentRoutes = require('./routes/student');

const app = express();
// enable CORS (Cross Origin Resource Sharing)
// needed for client to call the apis from different url
app.use(cors('*'));

const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use('/', studentRoutes);

app.use(errorHandler);
function errorHandler(err, req, res, next) {
  console.log(err);
}

process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});

app.listen(port, () => {
  console.log("Server is running http://localhost:" + port);
});
