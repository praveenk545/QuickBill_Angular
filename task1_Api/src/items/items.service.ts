import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ItemsService {

  constructor(@InjectRepository(Item)
   private userRepository: Repository<Item>,
  readonly entityManager: EntityManager,){}
 async create(createItemDto: CreateItemDto) {
  try {
    let user = new Item();
  
    user.itemName=createItemDto.itemName;
    user.unitPrice=createItemDto.unitPrice;
    user.quantity=createItemDto.quantity;
    let saved = await this.userRepository.save(user);
    return {
      statusCode: 200,
      message: ['Data saved'],
      data: { id: saved.id },
    };
  } catch (error) {
    console.log('error', error);
    return {
      statusCode: 500,
      message: [error.message],
      stack: error.stack,
    };
  }
  }

 async findAll() {
    try {
      let data = await this.userRepository.query(
        'select  * from item i',
      );
      return { statusCode: 200, data: data };
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

 async update(id: number, updateItemDto: UpdateItemDto) {
    try {
      //console.log('req', req.user);
      // id = req.user.roles == 'user_value' ? req.user_value.id : id;
      let user = await this.userRepository.query(`select  name "itemName", "unitPrice", quantity  from register r      
      where id = '${id}' and "isActive" = true`);
      if (user.length > 0) {
        let userEntity = new Item();
       
        if (updateItemDto.name) userEntity.itemName = updateItemDto.itemName;
        if (updateItemDto.name) userEntity.quantity = updateItemDto.quantity;
        if (updateItemDto.name) userEntity.unitPrice = updateItemDto.unitPrice;
       
        let saved = await this.userRepository.update({ id: id }, userEntity);
        return { statusCode: 200, message: ['User saved'], data: saved };
      } else {
        return { statusCode: 400, message: ['Invaild User'] };
      }
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
    }
  }

 async remove(id: number) {
    try {
      let data = await this.userRepository.delete({
        id: id,
      });
      return { statusCode: 200, data: data };
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
    }
  }
}
