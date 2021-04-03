import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthGoogleDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  refreshToken: string;
}
