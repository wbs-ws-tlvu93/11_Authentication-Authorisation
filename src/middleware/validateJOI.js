import ErrorResponse from '../utils/errorResponse.js';

const validateJOI = (schema) => (req, _, next) => {
  const { error } = schema.validate(req.body);
  return error ? next(new ErrorResponse(error, 400)) : next();
};

export default validateJOI;
