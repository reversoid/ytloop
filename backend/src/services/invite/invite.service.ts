import { Invite } from "../../models/invite.js";
import { User } from "../../models/user.js";
import { InviteRepository } from "../../repositories/invite/invite.repository.js";

export class InviteService {
  private readonly inviteRepository: InviteRepository;

  constructor({ inviteRepository }: { inviteRepository: InviteRepository }) {
    this.inviteRepository = inviteRepository;
  }

  getUserAcceptedInvites(userId: User["id"]): Promise<Invite[]> {
    return this.inviteRepository.getUserAcceptedInvites(userId);
  }
}
