import { ListRecipientNotifications } from './../../../app/use-cases/list-recipient-notifications'
import { SendNotification } from '@app/use-cases/send-notification'
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateNotificationBody } from '../dtos/create-notification-body'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { CancelNotification } from '@app/use-cases/cancel-notification'
import { ReadNotification } from '@app/use-cases/read-notification'
import { UnreadNotification } from '@app/use-cases/unread-notification'
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications'

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private readNotification: ReadNotification,
    private cancelNotification: CancelNotification,
    private unreadNotification: UnreadNotification,
    private listRecipientNotifications: ListRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id })
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id })
  }

  @Get('from/:recipientId')
  async listFromRecipient(@Param('recipientId') recipientId: string) {
    const notifications = await this.listRecipientNotifications.execute({
      recipientId,
    })

    return notifications.map(NotificationViewModel.toHttp)
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    })

    return count
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const notification = await this.sendNotification.execute(body)

    return NotificationViewModel.toHttp(notification)
  }
}
