import { Body, Controller, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto:AuthDto){
    console.log('received dto',dto )
    return this.authService.signup(dto)
  }

  // @Post('signup')
  // signup(
  //   @Body('email') email: string,
  //   @Body('password', ParseIntPipe) password: string,
  // ) {
  //   console.log({
  //     email,
  //     typeofEmail: typeof email,
  //     password,
  //     typeofPassword: typeof password,
  //   });
  //   return this.authService.signup();
  // }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    console.log('received dto', dto);
    return this.authService.login(dto);
  }
}
