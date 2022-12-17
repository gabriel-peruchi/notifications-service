import { Notification } from '@app/entities/notification'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      readAt: notification.readAt,
      category: notification.category,
      createdAt: notification.createdAt,
      content: notification.content.value,
      recipientId: notification.recipientId,
    }
  }
}
