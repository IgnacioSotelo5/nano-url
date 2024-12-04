import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req, Get, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { Request, Response } from 'express';
import { InvalidationTokenService } from './token-invalidation.service';
import { AuthRequest } from './interfaces/request.interface';
import { Public } from 'src/decorators/public.decorator';
import { ok } from 'assert';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly invalidationTokenService: InvalidationTokenService,
    private readonly usersService: UserService
  ) {}
  
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response){
    const newUser = await this.authService.register(registerDto);
    if(!newUser){
      return res.status(HttpStatus.BAD_REQUEST).json({message: 'Error registering user', ok: false})
    }
    return res.json({
      message: 'Register successful',
      onBoardingUrl: '/onboard',
      ok: true,
      id: newUser.id
    })
  }
  
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async logIn(@Body() loginDto: LoginDto, @Res() res: Response) {
    const {access_token} = await this.authService.logIn(loginDto)

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    })

    res.send({message: 'Login successful ', access_token, ok: true})
  }

  @Post('logout')
  async logOut(@Res() res: Response, @Req() req: Request) {
    const { access_token: token } = req.cookies;
  

    if (!token) {
        return res.status(400).send({ message: 'No token provided.' });
    }

    try {
        const tokenInvalidated = await this.invalidationTokenService.isTokenInvalidated(token);

        if (tokenInvalidated) {
            return res.send({ message: 'Token already invalidated' }); 
        } else{
          await this.invalidationTokenService.invalidateToken(token);
  
          res.clearCookie('access_token', {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
          });
  
          return res.send({ message: 'Logout successful.' });
        }

    } catch (error) {
        console.error('Error invalidating token:', error.message);
        return res.status(500).send({ message: 'Error invalidating token.' });
    }
  }

  @Get('me')
  async getInfo(@Req() req: AuthRequest){
    const user = req.user
    const {id} = user
    const existingUser = this.usersService.findUserById(id)
    
    if(user && existingUser){
      const {id, email} = user
      return {id, email}
    }
    else{
      throw new NotFoundException('User not found.')
    }
  }
}