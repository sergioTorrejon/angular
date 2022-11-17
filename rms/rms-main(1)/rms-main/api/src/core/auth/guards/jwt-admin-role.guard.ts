import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class JwtAdminRoleGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    console.log('inside JwtAdminRoleGuard');
    console.log(user);
    if (user && user.role && (user.role.includes(Roles.Administrador) || user.role.includes(Roles.OperadorFuncionarios) || user.role.includes(Roles.AprobadorFuncionarios))) {
      return user;
    }
    throw new ForbiddenException();
  }
} 
