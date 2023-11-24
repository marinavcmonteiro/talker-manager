const validateAuthorization = (req, res, next) => {
  const authorizations = req.headers.authorization;
  if (!authorizations) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorizations.length !== 16 || typeof (authorizations) !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = validateAuthorization;
