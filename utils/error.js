class GeneralError extends Error {
    constructor(message) {
      super();
      this.message = message;
    }
  
    getCode() {
      if (this instanceof BadRequest) return 400

      if (this instanceof Unauthorized) return 401

      if (this instanceof Forbidden) return 403
      
      if (this instanceof NotFound) return 404

      return 500;
    }
  }
  
  class BadRequest extends GeneralError { }
  class NotFound extends GeneralError { }
  class Unauthorized extends GeneralError { }
  class Forbidden extends GeneralError { }

  const errorHandler = (err, req, res, next) => {
console.log(err)
    if (err instanceof GeneralError) {
      return res.status(err.getCode()).json({
        error:true,
        info: err.message
      });
    }
  
    return res.status(500).json({
        error: true,
        info: err.message
    });//Default Error
  }

  module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    Unauthorized,
    Forbidden,
    errorHandler
  };