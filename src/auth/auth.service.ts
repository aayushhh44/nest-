import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { error } from 'console';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    // Example: Implement your signup logic
    console.log(dto);

    //generate the password hash

    const hash = await argon.hash(dto.password);

    //save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }

    throw error;

    //return the saved user
  }

  async login(dto: AuthDto) {
    // Example: Implement your login logic

    //find the user by email
    //if user does not exist throw exception

    //compare password
    //if password is incorrect then throw exception

    //send back the user

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    //compare pass

    const pwCompare = await argon.verify(user.hash, dto.password);

    if (!pwCompare) throw new ForbiddenException('Credentials incorrect');

    return { message: 'User signed in', user: dto.email };
    // return { message: 'User signed in', user: dto };
  }
}
