import { Content } from './content'

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('You received a notification!')

    expect(content).toBeTruthy()
  })

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow()
  })

  it('should not be able to create a notification content with more than 240 characters', () => {
    const largeContent = 'a'.repeat(241)

    expect(() => new Content(largeContent)).toThrow()
  })
})
