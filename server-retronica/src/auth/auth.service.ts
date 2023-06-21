import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (existingUser) throw new BadRequestException('User Already exists.');

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.internet.userName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number('+34 ### ### ###'),
        password: await hash(dto.password)
      }
    });

    const tokens = await this.issueTokens(newUser.id);

    return {
      user: this.returnUserFields(newUser),
      ...tokens
    };
  }

  private async issueTokens(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    });
    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (!user) throw new NotFoundException('User not found.');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new NotFoundException('Invalid password.');

    return user;
  }

  async getNewTokens(dto: RefreshTokenDto) {
    const result = await this.jwt.verifyAsync(dto.refreshToken);

    if (!result) throw new UnauthorizedException('Invalid refresh token.');

    const user = await this.prisma.user.findUnique({
      where: { id: result.id }
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens
    };
  }
}
