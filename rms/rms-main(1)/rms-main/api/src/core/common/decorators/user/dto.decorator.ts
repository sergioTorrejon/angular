import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const ReadDto = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const dto = request.body;
    return data ? dto && dto[data] : dto;
  },
);
