const express = require("express");
const app = express();
const PORT = 3000;

const errorHandingMiddleware = require("./middlewares/error-handing-middleware");

const authRouter = require("./routers/auth.router");
const todoRouter = require("./routers/todo.router");
app.use(express.json());

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.use(errorHandingMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
