import { Invite } from "../../models/invite.js";
import { Project } from "../../models/project.js";
import { User } from "../../models/user.js";
import { InviteRepository } from "../../repositories/invite/invite.repository.js";
import { UserService } from "../user/user.service.js";
import { CreateInviteDto } from "./types.js";

export class InviteService {
  private readonly inviteRepository: InviteRepository;
  private readonly userService: UserService;

  constructor({
    inviteRepository,
    userService,
  }: {
    inviteRepository: InviteRepository;
    userService: UserService;
  }) {
    this.inviteRepository = inviteRepository;
    this.userService = userService;
  }

  async createInvite(dto: CreateInviteDto): Promise<Invite | null> {
    const user = await this.userService.getUserByEmail(dto.userEmail);
    if (!user) {
      return null;
    }

    return this.inviteRepository.createInvite({
      permission: dto.permission,
      projectId: dto.projectId,
      userId: user.id,
    });
  }

  async removeInvite(inviteId: Invite["id"]): Promise<void> {
    await this.inviteRepository.removeInvite(inviteId);
  }

  async getInvite(inviteId: Invite["id"]): Promise<Invite | null> {
    return this.inviteRepository.getInvite(inviteId);
  }

  async acceptInvite(inviteId: Invite["id"]): Promise<Invite | null> {
    const invite = await this.inviteRepository.getInvite(inviteId);
    if (!invite || invite.rejectedAt !== null) {
      return null;
    }

    const acceptedInvite = await this.inviteRepository.acceptInvite(inviteId);
    return acceptedInvite;
  }

  async rejectInvite(inviteId: Invite["id"]): Promise<Invite | null> {
    const invite = await this.inviteRepository.getInvite(inviteId);
    if (!invite || invite.acceptedAt !== null) {
      return null;
    }

    const rejectedInvite = await this.inviteRepository.rejectInvite(inviteId);
    return rejectedInvite;
  }

  async getProjectAcceptedInvites(projectId: Project["id"]): Promise<Invite[]> {
    return this.inviteRepository.getProjectAcceptedInvites(projectId);
  }

  async getProjectWaitingInvites(projectId: Project["id"]): Promise<Invite[]> {
    return this.inviteRepository.getProjectWaitingInvites(projectId);
  }

  async getUserAcceptedInvites(userId: User["id"]): Promise<Invite[]> {
    return this.inviteRepository.getUserAcceptedInvites(userId);
  }

  async getUserWaitingInvites(userId: User["id"]): Promise<Invite[]> {
    return this.inviteRepository.getUserWaitingInvites(userId);
  }

  async getUserProjectInvite(
    userId: User["id"],
    projectId: Project["id"]
  ): Promise<Invite | null> {
    return this.inviteRepository.getUserInviteToProject(userId, projectId);
  }
}
