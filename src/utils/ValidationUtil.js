
export default class ValidationUtils {
  /**
   * Method to generate error validation function based on configuration of error messages
   * @param {object} config - configuration of error messages
   * @returns ErrorValidationFunction
   */
  static generateErrorValidationFunc(config) { 
    return (errors) => {
      errors.forEach((err) => {
      // eslint-disable-next-line no-param-reassign
        err.message = config[err.code] || config.default || 'Invalid Field';
      });
      return errors;
    };
  }
};
