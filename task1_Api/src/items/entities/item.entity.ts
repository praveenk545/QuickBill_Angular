import { ApiProperty } from '@nestjs/swagger';
import { Register } from 'src/register/entities/register.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    itemName: string;
  
    @Column()
    unitPrice: string;
  
    @Column()
    quantity: string;
  
    @ManyToOne(() => Register, register => register.item,{})
    register: Register;
}
