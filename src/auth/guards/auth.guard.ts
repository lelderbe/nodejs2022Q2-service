import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Errors } from '../../app/constants';
import { ExpressRequest } from '../../app/types/express-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('AuthGuard canActivate()');
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    if (request.user) {
      return true;
    }

    throw new UnauthorizedException(Errors.NOT_AUTHORIZED);
  }
}
