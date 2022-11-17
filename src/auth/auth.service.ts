import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { EncoderService } from './bcrypt/encoder.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { v4 } from 'uuid';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly encoderService: EncoderService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * We create a new user, check if the user already exists, and if not, we save the user to the
   * database
   * @param {RegisterUserDto} registerUser - RegisterUserDto
   */
  async registerUser(registerUser: RegisterUserDto): Promise<void> {
    const { email, password, roles } = registerUser;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepo.create({
      email,
      password: hashedPassword,
      roles,
      activationToken: v4(),
    });
    const foundUser = await this.userRepo.findOne({
      where: { email },
    });
    if (foundUser) {
      throw new HttpException(
        '',
        HttpStatus.CONFLICT,
      );
    }
    try {
      await this.userRepo.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(
          'Operation failed',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new InternalServerErrorException();
    }
    this.userRepo.save(user);
  }

  /**
   * It takes a loginDto object, finds a user by email, checks if the password is correct, and if so,
   * returns a JWT token
   * @param {LoginUserDto} loginDto - LoginUserDto - This is the DTO that we created earlier.
   * @returns { accessToken: string }
   */
  async findOneByEmail(
    loginDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (
      user &&
      (await this.encoderService.checkPassword(password, user.password))
    ) {
      const payload: JwtPayload = {
        id: user.id,
        email,
        active: user.active,
      };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * It takes an object with an id and a code, finds a user with that id and code, and if it finds one,
   * it sets the user's active property to true
   * @param {ActivateUserDto} activateUser - ActivateUserDto
   */
  async activateUser(activateUser: ActivateUserDto): Promise<void> {
    const { id, code } = activateUser;
    const user: User = await this.userRepo.findOne({
      where: { id, activationToken: code, active: false },
    });
    if (!user) {
      throw new UnprocessableEntityException('This action cannot be performed');
    }
    this.userRepo.update(id, { active: true });
    user.active = true;
    await this.userRepo.save(user);
  }

  getHello(user: any) {
    return this.userRepo.findOne(user.id);
  }

  
}
