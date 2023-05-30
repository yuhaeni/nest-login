import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getHelloWord(): string {
        return 'Hello World :D';
    }
}
