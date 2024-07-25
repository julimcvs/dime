import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    // Queues
    BullModule.registerQueue({
      name: 'bills',
    }),
  ],
  exports: [BullModule]
})
export class SharedModule {
}
