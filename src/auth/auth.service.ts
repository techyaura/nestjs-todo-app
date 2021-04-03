import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthSuccess } from './auth.model';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGoogleDto } from './dto/auth-google.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<User> {
    return await this.userRepository.signUp(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<IAuthSuccess> {
    const user = await this.userRepository.validateUserPassword(
      authCredentials,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const { email, id } = user;
    const accessToken = await this.jwtService.sign({
      email,
      id,
    });
    return {
      accessToken,
      data: { ...user },
    };
  }

  async googleLogin(authGoogleDto: AuthGoogleDto): Promise<IAuthSuccess> {
    const { email } = authGoogleDto;
    if (!email) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    let user = await this.userRepository.fetchUser(email);
    if (!user) {
      user = await this.signUp({
        email,
        password: Math.random().toString(36).slice(2), // [Todo] - Need to change
      });
    }
    const { id } = user;
    const accessToken = await this.jwtService.sign({
      email,
      id,
    });
    return {
      accessToken,
      data: { ...user },
    };
  }
}
