import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createOne, getOneByField, updateOne } from "../../database/crud.js";
import { User } from '../../database/models/auth/auth.js';
import { JWT_SECRET_KEY, JWT_EXPIRY_DELTA, AUTH_METHOD } from "../../constants/secrets.js";

const register = async (req, res) => {
  const existingUser = await getOneByField(User, 'email', req.body.email);
  if(existingUser)
    return res.status(403).json({ error: 'Email already exist' });
  const password = await bcrypt.hash(req.body.password, 10);
  const response = await createOne(User, {
    ...req.body,
    password,
    isActive: false,
  });
  return res.status(201).json({ userCreated: response?._id });
};

const login = async (req, res) => {
  const existingUser = await getOneByField(User, 'email', req.body.email);
  if(!existingUser)
    return res.status(404).json({ error: `User doesn't exist` });
  const match = await bcrypt.compare(req.body.password, existingUser.password);
  if(!match)
    return res.status(403).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ ...req.body, username: existingUser.username, id: existingUser._id },
    JWT_SECRET_KEY,
    { expiresIn: JWT_EXPIRY_DELTA }
  );
  return res.status(200).json({ token, accessType: AUTH_METHOD });
}

const updateUsername = async (req, res) => {
  const existingUser = await getOneByField(User, 'email', req.userToken.email);
  const response = await updateOne(User, existingUser._id, { username: req.body.username });
  return res.status(200).json({ usernameUpdated: response.username });
};

export { register, login, updateUsername };
