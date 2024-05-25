import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Register } from './entities/register.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(Register)
  private userRepository: Repository<Register>,
  readonly entityManager: EntityManager,){

  }
  async create(createRegisterDto: CreateRegisterDto) {
    try {
      let user = new Register();
      user.name = createRegisterDto.name;
      user.itemName=createRegisterDto.itemName;
    
      user.unitPrice=createRegisterDto.unitPrice;
      user.quantity=createRegisterDto.quantity;
      // user.amount=createRegisterDto.amount;

      // user.amount=(<number|undefined><unknown>createRegisterDto.unitPrice) * (<number|undefined><unknown>createRegisterDto.quantity);
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
        'select  * from register r',
      );
      return { statusCode: 200, data: data };
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
    }
  }

  async findOne(id: string) {
    try {
      //console.log('req', req.user);
      // id = req.user.roles == 'User' ? req.user.userId : id;
      let data = await this.userRepository.findOne({
        where: { id: id },
      });
      if (data) {
        console.log('hi');
        //checking for api
      }
      return { statusCode: 200, data: data };
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
    }
  }
  async update(id: string, updateRegisterDto: UpdateRegisterDto) {
    try {
      //console.log('req', req.user);
      // id = req.user.roles == 'user_value' ? req.user_value.id : id;
      let user = await this.userRepository.query(`select  name "itemName", "unitPrice", quantity, amount  from register r      
      where id = '${id}' and "isActive" = true`);
      if (user.length > 0) {
        let userEntity = new Register();
        if (updateRegisterDto.name) userEntity.name = updateRegisterDto.name;
        if (updateRegisterDto.name) userEntity.itemName = updateRegisterDto.itemName;
        if (updateRegisterDto.name) userEntity.quantity = updateRegisterDto.quantity;
        if (updateRegisterDto.name) userEntity.unitPrice = updateRegisterDto.unitPrice;
       
        let saved = await this.userRepository.update({ id: id }, userEntity);
        return { statusCode: 200, message: ['User saved'], data: saved };
      } else {
        return { statusCode: 400, message: ['Invaild User'] };
      }
    } catch (error) {
      return { statusCode: 500, message: [error.message] };
    }
  }

  async remove(id: string) {
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
