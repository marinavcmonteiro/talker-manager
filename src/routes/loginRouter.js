const express = require('express');

const loginRouter = express.Router();

const generatorToken = () => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let generatedToken = '';

  for (let i = 0; i < 16; i += 1) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    generatedToken += caracteres.charAt(indiceAleatorio);
  }

  return generatedToken;
};

loginRouter.post('/', (_req, res) => {
  const token = generatorToken();
  return res.status(200).json({ token });
});

module.exports = loginRouter; 