import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { ServerKafka } from '@nestjs/microservices'

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['intimate-panther-6836-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'aW50aW1hdGUtcGFudGhlci02ODM2JOGP8ymPuQTE8GyhWTO6zyZYibQvgD55giw',
          password:
            'QLQa33lAAeS8tbNYbu7TL4Fjm_kJvcPTJayNR1sguI0fhnKyDDC1XUoP38LLrAJzwSyMRQ==',
        },
        ssl: true,
      },
    })
  }

  async onModuleDestroy() {
    await this.close()
  }
}
