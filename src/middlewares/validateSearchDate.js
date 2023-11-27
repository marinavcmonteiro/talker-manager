const validateSearchDate = (req, res, next) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const { date } = req.query;

  if (!dateRegex.test(date) && date !== undefined && date !== '') {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateSearchDate;
