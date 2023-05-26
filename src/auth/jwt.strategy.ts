import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';

// 출처
// https://dapsu-startup.tistory.com/entry/NestJS-JWT-%EC%9D%B8%EC%A6%9D-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToekn()   // 헤더로부터 토큰 추출하는 함수
            ,secretOrKey : process.env.JWT_SECRET_KEY
            ,ignoreExpiration: false
        });
    }

}