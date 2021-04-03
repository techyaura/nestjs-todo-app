import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const JwtAuthUser = createParamDecorator(
  (data, req): User => {
    console.log(req);
    return req.user;
  },
);
