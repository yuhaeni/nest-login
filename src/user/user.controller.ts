import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe ,Request, UseFilters, Res, UseInterceptors, Bind, UploadedFiles, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { User } from 'src/entity/uesr.entity';
import { HttpExceptionFilter } from 'src/util/http-exception.filter';
import { multerDiskOptions } from 'src/util/multer.options';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

let userId = '';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get() // 경로를 설정하지 않으면 "user/" 경로로 설정이 된다.
    @UseFilters(new HttpExceptionFilter())
    getHelloWord(): string {
        return this.userService.getHelloWord();
    }

   /**
   * @author Ryan
   * @description @Body 방식 - @Body 어노테이션 여러개를 통해 요청 객체를 접근할 수 있습니다.
   *
   * @param id 유저 고유 아이디
   * @param name 유저 이름
   */
   @Post('/create_user')
   @UsePipes(ValidationPipe)
   onCreateUser(@Body() createUserDto: CreateUserDto ): Promise<boolean> {
     return this.userService.onCreateUser(createUserDto);
   }

   /**
   * @author Ryan
   * @description 전체 유저 조회
   */
   @Get('/user_all')
   getUserAll(): Promise<User[]> {
    return this.userService.getUserAll();
   }

   /**
   * @author Ryan
   * @description @Query 방식 - 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   */
  @Get('/user')
   findByUserOne1(@Query('id' ,ParseUUIDPipe) id:string): Promise<User> {
    return this.userService.findByUserOne(id);
   }

   /**
   * @author Ryan
   * @description @Param 방식 - 단일 유저 조회
   *
   * @param id 유저 고유 아이디
   */
   @Get('/user/:id')    
   findByUserOne2(@Param('id' ,ParseUUIDPipe) id: string): Promise<User> {
     return this.userService.findByUserOne(id);
   }

   /**
   * @author Ryan
   * @description @Param & @Body 혼합 방식 - 단일 유저 수정
   *
   * @param id 유저 고유 아이디
   * @param name 유저 이름
   */
  @Patch('/user/:id') // @PATCH : 단일 수정
  @UsePipes(ValidationPipe)
   setUser(
    @Param('id' ,ParseIntPipe) id:string 
    ,@Body() createUserDto: CreateUserDto
    ): Promise<boolean>{
    return this.userService.setUser(id ,createUserDto);
   }

  /**
   * @author Ryan
   * @description @Body 방식 - 전체 유저 수정
   *
   * @param id 유저 고유 아이디
   * @param name 유저 이름
   */
  @Put('/user/update') // @Put: 전체 수정
  setAllUser(@Body() createUserDto: CreateUserDto[]): Promise<boolean>{
    return this.userService.setAllUser(createUserDto);
  }


  /**
   * @author Ryan
   * @description @Query 방식 - 단일 유저 삭제
   *
   * @param id 유저 고유 아이디
   */
  @Delete('/user/delete')
  deleteUser(@Query('id' ,ParseUUIDPipe) id:string): Promise<boolean>{
    return this.userService.deleteUser(id);
  }


  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {

    console.log('Login Route');

    return req.user;
  }

    /**
   * @author Ryan
   * @description 디스크 방식 파일 업로드 (1)-> Destination 옵션 설정
   *
   * @param {File[]} files 다중 파일
   * @param res Response 객체
   */
    @Post('/disk_upload1')
    @UseInterceptors(FilesInterceptor('files' ,null ,multerDiskOptions))
    @Bind(UploadedFiles())
    uploadFileDisk(files: File[], @Res() res: Response) {
      res.status(HttpStatus.OK).json({
        success: true,
        DataTransfer: this.userService.uploadFileDisk(files)
      });
    }

    uploadFileDiskDestination(
      files: File[]
      ,@Body('user_id') user_id: string
      ,@Res() res: Response
    ) {
      if (user_id != undefined) {
        userId = user_id;
      }
      res.status(HttpStatus.OK).json({
        success: true
        ,data: this.userService.uploadFileDiskDestination(userId, files)
      })
    }



}
