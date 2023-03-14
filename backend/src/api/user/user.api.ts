import { Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserApi {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get('list')
  public async list(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('delete/:id')
  public async delete(@Param('id') id: number) {
    await this.userService.delete(id);
  }

  @Get(':email')
  public async getByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.getByEmail(email);
  }
}
