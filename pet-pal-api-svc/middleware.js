import jwt from 'jsonwebtoken';
import { AUTH_METHOD, JWT_SECRET_KEY } from "./constants/secrets.js";

const excludeFromAuth = ['/auth/login', '/auth/register'];

const isExcludedFromAuth = (url) => {
  return excludeFromAuth.includes(url);
}

const authMiddleware = (req, res, next) => {
  if (isExcludedFromAuth(req.url)) return next();
  const authHeader = req.headers['authorization'];
  const [method, token] = authHeader && authHeader.split(' ');
  if (!method || method !== AUTH_METHOD)
    return res.status(401).json({ error: 'Invalid method' });
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if(err) return res.status(401).json({ error: 'Unauthorized' });
    req.userToken = decoded;
    next();
  });
};

export default authMiddleware;
