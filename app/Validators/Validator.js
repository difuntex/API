const InvalidRequestException = use("App/Exceptions/InvalidRequestException");

class Validator {
  async fails(errorMessages) {
    throw new InvalidRequestException(
      errorMessages[0] !== null
        ? errorMessages[0].message
        : "A requisição falhou por uma entrada inapropriada."
    );
  }
}

module.exports = Validator;
