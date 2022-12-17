import { Notification as RawNotification } from '@prisma/client'
import { Notification } from '@app/entities/notification'
import { Content } from '@app/entities/content'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      readAt: notification.readAt,
      category: notification.category,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
      content: notification.content.value,
      recipientId: notification.recipientId,
    }
  }

  static toDomain(raw: RawNotification) {
    return new Notification(
      {
        readAt: raw.readAt,
        category: raw.category,
        createdAt: raw.createdAt,
        canceledAt: raw.canceledAt,
        recipientId: raw.recipientId,
        content: new Content(raw.content),
      },
      raw.id,
    )
  }
}
