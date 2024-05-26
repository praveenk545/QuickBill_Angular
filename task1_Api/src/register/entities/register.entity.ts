import { ApiProperty } from '@nestjs/swagger';
import { Item } from 'src/items/entities/item.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity()
export class Register {
    @PrimaryGeneratedColumn()
    id: string;
    @PrimaryGeneratedColumn('uuid')
    user_id: string;
  
    @Column({ default: null })
    name: string;
    
    @Column({ default: null })
    itemName: string;
  
    @Column({ default: null })
    unitPrice: string;

    @Column({ default: null })
    quantity: string;

    @Column({ default: null })
    date: string;

    @Column({ default: null })
    amount: string;

    @Column({ default: true })
    isActive: boolean;
  
    @CreateDateColumn()
    createAt: string;
  
    @UpdateDateColumn()
    updateAt: string;

    
  @OneToMany(() => Item, item => item.register, { cascade: true })
  item: Item[];
  
}
