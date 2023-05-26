import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';

// 출처
// https://dapsu-startup.tistory.com/entry/NestJS-JWT-%EC%9D%B8%EC%A6%9D-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84
// https://any-ting.tistory.com/119


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToekn()   // 헤더로부터 토큰 추출하는 함수
            ,secretOrKey : process.env.JWT_SECRET_KEY
            ,ignoreExpiration: false //true로 설정하면 Passport에 토큰 검증을 위임하지 않고 직접 검증, false는 Passport에 검증 위임
        });
    }

    /**
   * @author Ryan
   * @description 클라이언트가 전송한 Jwt 토큰 정보
   *
   * @param payload 토큰 전송 내용
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

}