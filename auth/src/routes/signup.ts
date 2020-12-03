import express from "express";
import * as yup from "yup";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { ValidationError } from "../errors/validation-error";
import jwt from "jsonwebtoken";
import { requestBodyValidation } from "../middlewares/request-body-validation";

const router = express.Router();

const validator = yup.object().shape({
  email: yup.string().required().email("Not an email"),
  password: yup
    .string()
    .required()
    .trim()
    .min(4, ({ min }) => `Password has to be longer then ${min}`)
    .max(20, ({ max }) => `Max password length is ${max}`),
});

router.post(
  "/api/users/signup",
  requestBodyValidation(validator),
  async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    const createdUser = await User.build({ email, password }).save();

    const jwtToken = jwt.sign(
      {
        id: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_TOKEN as string
    );

    req.session = {
      ...req.session,
      jwt: jwtToken,
    };

    res.status(201).send(createdUser);
  }
);

export { router as signupRouter };
