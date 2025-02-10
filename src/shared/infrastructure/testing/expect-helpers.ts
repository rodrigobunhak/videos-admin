import { ClassValidatorFields } from "src/shared/domain/validators/class-validator-fields";
import { EntityValidationError } from "src/shared/domain/validators/validation.error";

type ValidatorObject = {
  validator: ClassValidatorFields<any>;
  data: any;
};

type ValidatorFunction = () => any;

type Expected = ValidatorObject | ValidatorFunction;

type FieldsErrors = Record<string, string[]>;

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === "function") {
      return handleFunctionValidation(expected, received);
    } else {
      return handleObjectValidation(expected, received);
    }
  },
});

function handleFunctionValidation(validatorFunction: ValidatorFunction, receivedErrors: FieldsErrors) {
  try {
    validatorFunction();
    return receivedErrors ? assertNotContainsErrorsMessages(receivedErrors) : isValid();
  } catch (error) {
    const validationError = error as EntityValidationError;
    return assertContainsErrorsMessages(validationError.error, receivedErrors);
  }
}

function handleObjectValidation(validatorObject: ValidatorObject, receivedErrors: FieldsErrors) {
  const { validator, data } = validatorObject;
  const isValidated = validator.validate(data);

  if (isValidated) {
    return isValid();
  }

  return assertContainsErrorsMessages(validator.errors, receivedErrors);
}

function assertContainsErrorsMessages(expectedErrors: FieldsErrors, receivedErrors: FieldsErrors) {
  const isMatch = expect.objectContaining(receivedErrors).asymmetricMatch(expectedErrors);

  return isMatch
    ? isValid()
    : {
        pass: false,
        message: () =>
          `The validation errors do not contain ${JSON.stringify(
            receivedErrors
          )}. Current errors: ${JSON.stringify(expectedErrors)}`,
      };
}

function assertNotContainsErrorsMessages(receivedErrors: FieldsErrors) {
  return {
    pass: false,
    message: () =>
      `The validation errors do not contain ${JSON.stringify(receivedErrors)}`,
  };
}

function isValid() {
  return { pass: true, message: () => "" };
}