const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const token1 = req.cookies.jwt;

  if (!token1 || !token1.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  const cookieToken = token1.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(cookieToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
