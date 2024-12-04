import { Controller, Get, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, Req, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from 'src/interceptors/file.interceptor';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream, promises as fs } from 'fs';
import * as mime from 'mime-types'


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id?')
  async findOneById(@Param('id') id: string, @Req() req): Promise<User> {
    const userId = id || req.user.id
  
    return await this.userService.findUserById(userId);
  }

  @Get('profile-img/:filename')
  async getProfileImage(@Param('filename') filename: string, @Res() res: Response){
    
    const filePath = join(__dirname, '..', '..', 'storage', 'profile-img', filename)
        

    try {
      await fs.access(filePath)
    } catch (error) {   
      throw new NotFoundException('File not found.')
    }

    const mimeType = mime.lookup(filePath) || 'application/octet-stream'
    res.setHeader('Content-Type', mimeType)
    const fileStream = createReadStream(filePath)
    
    fileStream.pipe(res)
    
  }

  @Patch('update-user/:id?')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    const userId = id || req.user.id
    
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Patch('profile-image/:id?')
  @UseInterceptors(FileInterceptor.createFileInterceptor('file', './storage/profile-img'))
  async updateProfileImage (@UploadedFile() file: Express.Multer.File, @Res() res: Response, @Req() req) {
    const id = req.user.id
    const filename = file.filename
    
    try {
      const updateUser = await this.userService.updateUser(id, {filename})      
      if(updateUser){
        return res.send({ok:true, succes:true, error:null, message: 'File was upload successfully'})
      }
      return res.status(400).json({message: 'Error on file upload', success: false})
    } catch (error) {
      throw new BadRequestException('User cannot be updated') 
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id || id
    return await this.userService.removeUser(userId);
  }
}
