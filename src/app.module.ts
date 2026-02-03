import { ExecutionContext, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { minutes, seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

@Module({
  imports: [ThrottlerModule.forRoot({
    throttlers: [
      { name: 'short', limit: 3, ttl: seconds(4), blockDuration: minutes(10) },
      { name: 'medium', limit: 10, ttl: seconds(30), blockDuration: minutes(20) },
      { name: 'long', limit: 20, ttl: seconds(60) }
    ],
    errorMessage: 'Wow! Slow Down!',
    storage: new ThrottlerStorageRedisService(),
    getTracker: (req: Record<string, any>, context: ExecutionContext) => {
      console.log(req?.headers['x-tenant-id']); 
      return req?.headers['x-tenant-id'];
    },
    generateKey: (context: ExecutionContext, trackerString: string, throttlerName: string) => {
      return trackerString;
    },
  }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }],
})
export class AppModule { }
