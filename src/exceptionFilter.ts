import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { join } from 'path';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // response.sendFile('../../agil-client/dist');
    response.sendFile(join(__dirname, '/../../', 'agil-client/dist/index.html'));
    console.log('yurd', ctx);
    console.log('res', response);
  }
}