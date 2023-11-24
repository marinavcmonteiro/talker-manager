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

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(response);

  const talkerById = data.find((talker) => talker.id === Number(id));

  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talkerById);
});

module.exports = talkerRouter;
