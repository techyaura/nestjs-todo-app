import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IRequestSuccess } from './auth.model';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentials: AuthCredentialsDto): Promise<IRequestSuccess> {
    try {
      const { email, password } = authCredentials;
      const user = new User();
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      await user.save();
      return {
        message: `User added successfully`,
      };
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

  async validateUserPassword(authCredentials: AuthCredentialsDto) {
    const { password, email } = authCredentials;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user.email;
    }
    return null;
  }
}
