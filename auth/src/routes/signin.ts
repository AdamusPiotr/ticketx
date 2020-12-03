import express from "express";
import * as yup from "yup";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { requestBodyValidation } from "../middlewares/request-body-validation";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

const validator = yup.object().shape({
  email: yup.string().required().email("Not an email"),
  password: yup.string().required(),
});

router.post(
  "/api/users/signin",
  requestBodyValidation(validator),
  async (req, res) => {
    const { email, password } = req.body;
    const relatedUser = await User.findOne({ email });

    if (!relatedUser) {
      throw new BadRequestError("Incorrect credentials");
    }

    const isSamePassword = Password.compare(relatedUser.password, password);

    if (!isSamePassword) {
      throw new BadRequestError("Incorrect credentials");
    }

    const jwtToken = jwt.sign(
      {
        id: relatedUser.id,
        email: relatedUser.email,
      },
      process.env.JWT_TOKEN as string
    );

    req.session = {
      ...req.session,
      jwt: jwtToken,
    };

    res.status(201).send(relatedUser);
  }
);

export { router as signinRouter };
