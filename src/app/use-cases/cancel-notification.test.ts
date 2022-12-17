import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { CancelNotification } from './cancel-notification'
import { Notification } from '@app/entities/notification'
import { Content } from '@app/entities/content'
import { NotificationNotFound } from './errors/notification-not-found'

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = new Notification({
      category: 'social',
      recipientId: 'example-recipient-id',
      content: new Content('This is a notification.'),
    })

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    )
  })

  it('should no be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() =>
      cancelNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFound)
  })
})
