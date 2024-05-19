import jwt from 'jsonwebtoken';

export const jwtSignAsync = (payload, secretKey, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const jwtVerifyAsync = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
