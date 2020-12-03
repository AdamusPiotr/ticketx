import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import moongose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.use(json());
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("/*", (req) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await moongose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(process.env.JWT_TOKEN);

    console.log("Mongo db connected");
  } catch (e) {
    console.error("Error while connecting db");
  }

  app.listen(3000, () => {
    console.log("version 0.2");
    console.log("Listening on port 3000");
  });
};

start();
