import { Replace } from './../../helpers/Replace'
import { Content } from './content'
import { randomUUID } from 'node:crypto'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  createdAt: Date
  readAt?: Date | null
  canceledAt?: Date | null
}

type NotificationPropsInit = Replace<NotificationProps, { createdAt?: Date }>

export class Notification {
  private _id: string
  private props: NotificationProps

  constructor(props: NotificationPropsInit) {
    this._id = randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  public get recipientId() {
    return this.props.recipientId
  }

  public set content(content: Content) {
    this.props.content = content
  }

  public get content() {
    return this.props.content
  }

  public set category(category: string) {
    this.props.category = category
  }

  public get category() {
    return this.props.category
  }

  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt
  }

  public get readAt() {
    return this.props.readAt
  }

  public cancel() {
    this.props.canceledAt = new Date()
  }

  public get canceledAt() {
    return this.props.canceledAt
  }

  public get createdAt() {
    return this.props.createdAt
  }
}
