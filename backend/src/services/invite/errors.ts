export class InviteExistsException extends Error {
  constructor() {
    super("INVITE_ALREADY_SENT");
  }
}
