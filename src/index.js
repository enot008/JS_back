const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const { func } = require("./dataBase");
const { notFound, errorHandler } = require("./middlewares/middlewares");
const apiToDosRouter = require("./controllers/api-todos.controller");
const apiAuthRouter = require("./controllers/api-auth.controller");
const apiUsersRouter = require("./controllers/api-users.controller")

func();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("URL = ", req.url);
  console.log("Original_URL = ", req.originalUrl);
  console.log("METHOD = ", req.method);
  console.log("HOST = ", req.headers.host);
  console.log("IsSecure = ", req.secure);
  console.log("BODY", req.body);
  console.log("QUERY", req.query);

  next();
});

app.use("/api/todos", apiToDosRouter);
app.use("/api/auth", apiAuthRouter);
app.use("/api/users", apiUsersRouter);
app.use("/test", testrouter);

app.use(notFound);
app.use(errorHandler);

http.createServer(app).listen(7777, () => {
  console.log("Server is working on port 7777");
});