import { Request } from "express";
import express from "express";
import * as yup from "yup";
import { User } from "../models/user";

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

router.post("/api/users/signup", async (req, res) => {
  try {
    await validator.validate(req.body, {
      abortEarly: false,
    });
  } catch (e) {
    res.send(e);
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.send({});
  }

  User.build({ email, password }).save();
});

export { router as signupRouter };
