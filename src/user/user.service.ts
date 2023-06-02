import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { User } from 'src/entity/uesr.entity';

// const users: User[] = [
//     { id: 1, name: '유저1' },
//     { id: 2, name: '유저2' },
//     { id: 3, name: '유저3' },
// ]
  
@Injectable()
export class UserService {

    // 생성자 부분에 가져와 사용한다.
    constructor(                                    
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository, 
    ){}

    /**
   * @author Ryan
   * @description 유저 생성
   *
   * @param id 유저 고유 아이디
   * @param name 유저 이름
   * @returns {User[]} users
   */
    onCreateUser (createUserDto: CreateUserDto): Promise<boolean> {
        return this.userRepository.onCreate(createUserDto);
    }

   /**
   * @author Ryan
   * @description 모든 유저 조회
   *
   * @returns {User[]} users
   */
   getUserAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

   /**
   * @author Ryan
   * @description 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   * @returns {User} users
   */
   findByUserOne(id: string): Promise<User> {
    return this.userRepository.findById(id);
   }

   /**
   * @author Ryan
   * @description 단일 유저 수정
   *
   * @returns {User} users
   */   
  setUser(id:string ,createUserDto: CreateUserDto): Promise<boolean> {
    return this.userRepository.onChangeUser(id ,createUserDto);
  }

   /**
   * @author Ryan
   * @description 전체 유저 수정
   *
   * @returns {User[]} users
   */
   setAllUser(createUserDto: CreateUserDto[]): Promise<boolean>{
    return this.userRepository.onChangeUsers(createUserDto);
   }

   /**
   * @author Ryan
   * @description 유저 삭제
   *
   * @param id
   * @returns {User[]} users
   */
  deleteUser (id:string): Promise<boolean> {
    return this.userRepository.onDelete(id);
  }


    getHelloWord(): string {
        return 'Hello World :D !';
    }
}
