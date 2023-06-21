import { MinLength, IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(8, {
    message: 'Password must be at least 8 character long.'
  })
  @IsString()
  password: string;
}
