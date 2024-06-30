export class NoUserException extends Error {
  constructor() {
    super("NO_SUCH_USER");
  }
}

export class WrongCredentialsException extends Error {
  constructor() {
    super("WRONG_CREDENTIALS");
  }
}

export class UserAlreadyExtistsException extends Error {
  constructor() {
    super("ALREADY_EXISTS");
  }
}