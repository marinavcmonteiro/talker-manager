const getRate = (req) => {
  const { rate } = req.body.talk || req.body;
  return rate;
};

const validateRate = (req, res, next) => {
  const rate = getRate(req);
  if (rate === undefined) {
    return res.status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};
  
module.exports = validateRate;