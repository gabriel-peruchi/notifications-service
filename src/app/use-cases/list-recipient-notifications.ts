import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { Notification } from '@app/entities/notification'

interface ListRecipientNotificationsRequest {
  recipientId: string
}

@Injectable()
export class ListRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ListRecipientNotificationsRequest,
  ): Promise<Notification[]> {
    const { recipientId } = request

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId)

    return notifications
  }
}
