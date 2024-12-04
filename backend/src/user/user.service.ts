import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { USER_REPOSITORY } from 'src/constants';
import { RegisterDto } from 'src/auth/dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/config';

@Injectable()
export class UserService {
  constructor(
  @Inject(USER_REPOSITORY) 
  private userRepository: Repository<User>){
    
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    const {email, password} = registerDto
    
    const existingUser = await this.userRepository.findOne({where: {email}})
    
    if(existingUser){
      throw new ConflictException(`User with email ${email} already exists.`)
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    })

    try {
      return await this.userRepository.save(newUser)
    } catch (error) {
      throw new BadRequestException('Failed to create user: ' + error.message)
    }

  }

  async findAllUsers() {
    return await this.userRepository.find()
  }

  async findUserById(id: string): Promise<User | null> {
    try{
      const user = await this.userRepository.findOne(
        {
          where: {
            id
          }
        }
      )
      const {password, ...data} = user
      const userData: User = data
      return userData    
    } catch(error){
      throw new NotFoundException(`User with ID ${id} not found.`)
    }
  }
  
  async findUserByEmail(email: string): Promise<User| null>{
    try {
      const user = await this.userRepository.findOne({
        where: {email}
      })
      if(!user){
        return null
      }
      return user
    } catch (error) {
      throw new NotFoundException(`User with email ${email} not found.`)
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {    
    const user = await this.userRepository.findOneBy({id})
    if(!user) throw new NotFoundException('User not found')
      
    try {
      const {password, ...data} = updateUserDto
      
      const updatedData: Partial<UpdateUserDto> = {...data}

      if(password){
        updatedData.password = await bcrypt.hash(password, SALT_ROUNDS)
      }
      
      const updatedUser = this.userRepository.merge(user, updatedData)
    
      return await this.userRepository.save(updatedUser)
    } catch (error) {
      throw new BadRequestException('User could not be updated.')
    }    
  }

  async removeUser(id: string): Promise<DeleteResult> {
    const user = await this.userRepository.findOneBy({id})
    if(!user) throw new NotFoundException(`User with ID ${id} not found.`)
    
    return await this.userRepository.delete(user);
  }
}
