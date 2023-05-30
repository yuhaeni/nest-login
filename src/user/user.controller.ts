import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get() // 경로를 설정하지 않으면 "user/" 경로로 설정이 된다.
    getHelloWord(): string {
        return this.userService.getHelloWord();
    }
}
