const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const talkerRouter = express.Router();

const filePath = path.join(__dirname, '../talker.json');

talkerRouter.get('/', async (_req, res) => {
  const response = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(response);

  return res.status(200).json(data);
});

module.exports = talkerRouter;
