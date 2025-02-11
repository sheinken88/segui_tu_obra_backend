// src/quantity-takeoff/quantity-takeoff.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TakeoffItem } from './takeoff-item.entity';
import { TakeoffItemAssignment } from './takeoff-item-assignment.entity';
import { QuantityTakeoffService } from './quantity-takeoff.service';
import { QuantityTakeoffController } from './quantity-takeoff.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TakeoffItem, TakeoffItemAssignment])],
  controllers: [QuantityTakeoffController],
  providers: [QuantityTakeoffService],
  exports: [QuantityTakeoffService],
})
export class QuantityTakeoffModule {}
