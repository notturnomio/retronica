import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = () => UseGuards(AuthGuard('jwt'));

// import { applyDecorators, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// export function Auth() {
//   return applyDecorators(UseGuards(AuthGuard('jwt')));
// }
