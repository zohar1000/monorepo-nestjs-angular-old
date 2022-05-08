import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemEvents } from './entities/system-events.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([SystemEvents])
     ],
     exports: [
         TypeOrmModule.forFeature([SystemEvents])
      ]
})
export class SharedServerModule {}
