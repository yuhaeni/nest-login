import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    /**
   * @author Ryan
   * @description 예외 처리 함수
   *
   * @param exception 현재 처리 중인 예외 객체
   * @param host ArgumentsHost 객체 -> 핸들러에 전달되는 인수를 검색하는 메서드를 제공한다 (Express를 사용하는 경우 - Response & Request & Next 제공)
   */
  
  catch(exception: HttpException, host: ArgumentsHost) { // 두 파라미터 값을 통해 우리는 원하는 예외 상태를 수집하고 클라이언트에게 알맞은 정보를 제공할 수 있다. 

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;


    /**
     * @author Ryan
     * @description HttpException에서 전송한 데이터를 추출할 때 사용
     */

    const res: any = exception.getResponse();

    // 요청 url 및 에러 정보
    const url: string = request.url;
    const error: string = res.error;
    const timestamp: string = new Date().toISOString();

    console.log('요청 url : ', url);
    console.log('error 정보 : ', error);
    console.log('발생 시간 : ', timestamp);

    /* 클라이언트에게 정보를 전달한다. */
    response.status(status).json({
      success: false ,
      message: res.message,
    })

  }
  
  

}
