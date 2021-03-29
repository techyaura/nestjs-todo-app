import { EntityRepository, Repository } from 'typeorm';
import { User } from './auth.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {}
