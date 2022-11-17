import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenArray: string[] = req.headers['authorization'].split(' ');
      const decodedToken = await this.jwtService.verify(tokenArray[1]);

      const user = await this.userService.findOneById(decodedToken.id);
      if (user) {
        req.user = user;
        next();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  }
}
