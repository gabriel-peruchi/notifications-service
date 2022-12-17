import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/notifications.controller'
import { SendNotification } from '@app/use-cases/send-notification'
import { DatabaseModule } from '../database/database.module'
import { CancelNotification } from '@app/use-cases/cancel-notification'
import { ReadNotification } from '@app/use-cases/read-notification'
import { UnreadNotification } from '@app/use-cases/unread-notification'
import { ListRecipientNotifications } from '@app/use-cases/list-recipient-notifications'
import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    ReadNotification,
    CancelNotification,
    UnreadNotification,
    ListRecipientNotifications,
    CountRecipientNotifications,
  ],
})
export class HttpModule {}
