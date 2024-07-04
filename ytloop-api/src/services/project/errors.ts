export class ProjectExistsException extends Error {
  constructor() {
    super("PROJECT_ALREADY_EXISTS");
  }
}
