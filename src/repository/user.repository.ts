import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { User } from 'src/entity/uesr.entity';
import { Repository } from 'typeorm';


@CustomRepository(User)
export class UserRepository extends Repository<User> {}