const validateService = require('../services/validateService');

// middleware que chama schema validação do joi
const joiValidate = (schema) => (req, res, next) => {
const { error } = schema.validate(req.body);
if (error) {
  const [code, message] = error.message.split('|');
  return res.status(code).json({ message });
}
next();
};

const checkProductExists = async (req, res, next) => {
  const { name } = req.body;
  const productExists = await validateService.checkProductExists(name);
   // Se o nome já existir no banco o service retornar productExists com true ou false caso não exista
   if (productExists) return res.status(409).json({ message: 'Product already exists' });
   next();
};

module.exports = {
  joiValidate,
  checkProductExists,
};
