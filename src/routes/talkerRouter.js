const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const validateAuthorization = require('../middlewares/validateAuthorization');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateRate = require('../middlewares/validateRate');
const validateSearchRate = require('../middlewares/validateSearchRate');
const validateSearchDate = require('../middlewares/validateSearchDate');
// const validateSearchDate = require('../middlewares/validateSearchDate');

const talkerRouter = express.Router();

const filePath = path.join(__dirname, '../talker.json');

talkerRouter.get('/search', 
  validateAuthorization, 
  validateSearchRate,
  validateSearchDate,
  async (req, res) => {
    const response = await fs.readFile(filePath, 'utf-8');
    let dataTalker = JSON.parse(response);
    const { q, rate, date } = req.query;
    if (date !== '' && date !== undefined) {
      dataTalker = dataTalker.filter((talker) => 
        talker.talk.watchedAt.split('/').join() === date.split('/').join());
    }
    if (q) {
      dataTalker = dataTalker.filter((talker) => 
        talker.name.toLowerCase().includes(q.toLowerCase()));
    }
    if (rate) {
      dataTalker = dataTalker.filter((talker) => talker.talk.rate === Number(rate));
    }
    return res.status(200).json(dataTalker);
  });

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

talkerRouter.post('/', 
  validateAuthorization, 
  validateName, 
  validateAge,
  validateTalk,
  validateRate,
  async (req, res) => {
    const response = await fs.readFile(filePath, 'utf-8');
    const dataTalker = JSON.parse(response);
    const nextId = Number(dataTalker.slice(-1)[0].id) + 1;
    const newTalker = { ...req.body, id: nextId };

    dataTalker.push(newTalker);
    const newData = JSON.stringify(dataTalker);
    await fs.writeFile(filePath, newData);

    return res.status(201).json(newTalker);
  });

talkerRouter.put('/:id',
  validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const response = await fs.readFile(filePath, 'utf-8');
    const dataTalker = JSON.parse(response);

    if (!dataTalker.find((talker) => talker.id === Number(id))) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const updateTalker = { ...req.body, id: Number(id) };
    const updateDataTalker = dataTalker.filter((talker) => talker.id !== Number(id));
    updateDataTalker.push(updateTalker);

    const data = JSON.stringify(updateDataTalker);
    await fs.writeFile(filePath, data);
    return res.status(200).json(updateTalker);
  });

talkerRouter.delete('/:id', validateAuthorization, async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile(filePath, 'utf-8');
  const dataTalker = JSON.parse(response);

  const newDataTalker = dataTalker.filter((talker) => talker.id !== Number(id));
  const data = JSON.stringify(newDataTalker);
  await fs.writeFile(filePath, data);
  return res.status(204).end();
});

module.exports = talkerRouter;
