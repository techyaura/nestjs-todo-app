import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentials: AuthCredentialsDto): Promise<User> {
    try {
      const { email, password } = authCredentials;
      const user = new User();
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      await user.save();
      return user;
    } catch (err) {
      // postgres
      if (err.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async fetchUser(email: string): Promise<User> {
    return await this.findOne({ email });
  }

  async validateUserPassword(
    authCredentials: AuthCredentialsDto,
  ): Promise<User> {
    const { password, email } = authCredentials;
    const user = await this.fetchUser(email);
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }
}
