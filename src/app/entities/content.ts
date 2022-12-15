export class Content {
  private readonly content: string

  get value() {
    return this.content
  }

  private validadeContentLength(content: string) {
    return content.length >= 5 && content.length <= 240
  }

  constructor(content: string) {
    const isContentLengthValid = this.validadeContentLength(content)

    if (!isContentLengthValid) {
      throw new Error('Content length error.')
    }

    this.content = content
  }
}
