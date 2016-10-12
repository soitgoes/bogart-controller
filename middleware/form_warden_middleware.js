var formWarden = require('form-warden');
var serialize = require('serialize-javascript');

module.exports = (validationOptions) => {
  var str = serialize(validationOptions);

  return (req, locals, next) => {
    locals.validationOptions = req.validationOptions = str;
    
    let result = formWarden.validateForm(req.params, validationOptions);
    if (!result.validForm) {
      return {
        status: 500,
        headers: {},
        body: ['Invalid Form!']
      };
    }

    return next();
  };
}