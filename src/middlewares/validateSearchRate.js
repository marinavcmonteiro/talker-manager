const validateSearchRate = (req, res, next) => {
  const { rate } = req.query;

  if (rate !== undefined && (rate < 1 || rate > 5 || parseInt(rate, 10) !== parseFloat(rate, 10))) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = validateSearchRate;
