import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { CustomRepository } from 'src/db/typeorm-ex.decorator';
import { User } from 'src/entity/uesr.entity';
import { CreateUserDto } from 'src/user/user.dto';
import { Repository } from 'typeorm';


// 출처: https://any-ting.tistory.com/114
@CustomRepository(User)
export class UserRepository extends Repository<User> {


    // 유저 생성
    async onCreate (createUserDto: CreateUserDto): Promise<boolean> {

        
        try {

            const { user_id , password , name , age } = createUserDto;

            const user = await this.save({
                user_id,
                password,
                salt:'테스트용',
                name,
                age,
            });
    
            return user ? true : false ; 

        } catch (error) {
            
            throw new HttpException (
                {
                    message: 'SQL 에러',
                    eroor: error.sqlMessage,
                },
                HttpStatus.FORBIDDEN,
            );
            
        }

        
    }

    // 모든 유저 조회
    async findAll(): Promise<User[]> {
        return await this.find();
    }

    // 단일 유저 조회
    async findById(id: string): Promise<User> {
        
        const user = await this.findOne({ where : {id}});

        if(!user) {
            throw new NotFoundException('유저를 찾을 수 없습니다.');
        }

        return user;

    }

    // 단일 유저 수정
    async onChangeUser(
        id:string,
        createUserDto: CreateUserDto,
    ): Promise<boolean> {

        const { name , age } = createUserDto; 

        const chnageUser = await this.update( {id} , { name , age });

        if (chnageUser.affected !== 1 ) {
            throw new NotFoundException('유저가 존재하지 않습니다.');
        }

        return true;
    }

    // 전체 유저 수정
    async onChangeUsers (createUserDto: CreateUserDto[]) : Promise<boolean> {

        const user = createUserDto.map((data) => {
            return this.update(data.user_id , {name: data.name , age:data.age});
        });

        await Promise.all(user);

        return true; 

    }

    // 유저 삭제 
    async onDelete (id: string): Promise<boolean> {

        /**
         * remove() vs delete()
         * - remove: 존재하지 않는 아이템을 삭제하면 404 Error가 발생한다.
         * - delete: 해당 아이템이 존재 유무를 파악하고 존재하면 삭제하고 , 없다면 아무 에러도 발생하지 않는다.
         */

        const deleteUser = await this.delete(id);

        if(deleteUser.affected===0) {
            throw new NotFoundException('유저가 존재하지 않습니다.'); 
        }

        return true;

    }

    // 로그인 유저 조회
    async  findByLogin (user_id:string , password: string) : Promise<User> {

        const user = await this.findOne( {where: { user_id , password }} );

        if(!user) {
            throw new ForbiddenException('아이디와 비밀번호를 다시 확인해주세요.')
        }

        return user;

    }

}