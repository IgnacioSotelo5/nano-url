import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './interfaces/login.interface';
import { UserResponse } from './interfaces/user-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ){}

  async register(registerDto: RegisterDto): Promise<UserResponse>{    
    try {
      const newUser = await this.userService.createUser(registerDto)
      
      const {password, ...rest} = newUser
      return rest
    } catch (error) {
      throw new BadRequestException('Failed to register user: ' + error.message)
    }
   
  }

  async logIn(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.userService.findUserByEmail(email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(`Invalid email or password.`);
    }
  
    const { password: _, ...data } = user;
    const payload = {
      id: data.id,
      email: data.email,
    };
  
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  
}
