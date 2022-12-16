import { Injectable } from '@nestjs/common'
import { Content } from '../entities/content'
import { Notification } from '../entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

interface SendNotificationRequest {
  content: string
  category: string
  recipientId: string
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: SendNotificationRequest): Promise<Notification> {
    const { recipientId, content, category } = request

    const notification = new Notification({
      category,
      recipientId,
      content: new Content(content),
    })

    await this.notificationsRepository.create(notification)

    return notification
  }
}
