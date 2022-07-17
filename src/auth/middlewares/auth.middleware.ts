import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { ExpressRequest } from '../../app/types/express-request.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    console.log('use middleware');
    req.user = null;
    if (!req.headers.authorization) {
      next();
      return;
    }

    // const token = req.headers.authorization.split(' ')[1];
    const token = req.headers.authorization;
    console.log('token:', token);
    try {
      const payload = this.jwtService.verify(token);
      console.log('payload:', payload);
      const user = await this.usersService.findOne(payload?.sub);
      req.user = user ? user : null;
    } catch (err) {
      req.user = null;
    }
    next();
  }
}
