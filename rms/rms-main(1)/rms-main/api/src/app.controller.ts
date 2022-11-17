import {
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';

import { AppService } from './app.service';
import { ResDto } from './services/res/dtos/res.dto';

interface token{
  access_token:string;
  token_type:string;
  expires_in:number;
  refresh_token:string;
  check_refresh_token:number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('estado')
  getStatus(): ResDto {
    return this.appService.getStatus();
  }

  @Post('token')
  getToken(@Body() data: any): token {
    console.log('data');
    console.log(data);
    if (data.usuario == 'administrador'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODFjYmFkYi1kOGZiLTQzOWYtODY3Yi1hNDFkZTM5M2M4OGQiLCJpYXQiOjE2Njc5Njg1NTAsInN1YiI6ImptYW1hbmkiLCJ1c2VybmFtZSI6ImptYW1hbmkiLCJ1aWQiOjI1MCwiY29tcGFueSI6IkFQUyIsInJvbGUiOlsiYWRtaW5pc3RyYWRvciJdLCJuYmYiOjE2Njc5Njg1NTAsImV4cCI6MTY3Nzk3OTE1MCwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoibG9jYWxob3N0In0.D0uTfY_v3zyMNqQAcqMa5cNcrK-EmP3r4BR__NSrX4U",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else if (data.usuario == 'operador_funcionarios'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODFjYmFkYi1kOGZiLTQzOWYtODY3Yi1hNDFkZTM5M2M4OGQiLCJpYXQiOjE2Njc5Njg1NTAsInN1YiI6ImptYW1hbmkiLCJ1c2VybmFtZSI6ImptYW1hbmkiLCJ1aWQiOjI1MCwiY29tcGFueSI6IkFQUyIsInJvbGUiOlsib3BlcmFkb3JfZnVuY2lvbmFyaW9zIl0sIm5iZiI6MTY2Nzk2ODU1MCwiZXhwIjoxNjc3OTc5MTUwLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.mtNkB55hqP9KWJTRsAy8tRY23ckUXim4P99vP5AHdyg",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else if (data.usuario == 'aprobador_funcionarios'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODFjYmFkYi1kOGZiLTQzOWYtODY3Yi1hNDFkZTM5M2M4OGQiLCJpYXQiOjE2Njc5Njg1NTAsInN1YiI6ImptYW1hbmkiLCJ1c2VybmFtZSI6ImptYW1hbmkiLCJ1aWQiOjI1MCwiY29tcGFueSI6IkFQUyIsInJvbGUiOlsiYXByb2JhZG9yX2Z1bmNpb25hcmlvcyJdLCJuYmYiOjE2Njc5Njg1NTAsImV4cCI6MTY3Nzk3OTE1MCwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoibG9jYWxob3N0In0.SnOf8M0Sm5VPurAyeuy1cj05DTOr-NWqkNVy8mVJibA",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else if (data.usuario == 'consulta'){
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODFjYmFkYi1kOGZiLTQzOWYtODY3Yi1hNDFkZTM5M2M4OGQiLCJpYXQiOjE2Njc5Njg1NTAsInN1YiI6ImptYW1hbmkiLCJ1c2VybmFtZSI6ImptYW1hbmkiLCJ1aWQiOjI1MCwiY29tcGFueSI6IkFQUyIsInJvbGUiOlsiY29uc3VsdGEiXSwibmJmIjoxNjY3OTY4NTUwLCJleHAiOjE2Nzc5NzkxNTAsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.J0-VecyUNZ0KSiXBu1dRQgXnrk6eysCpVYDR_0wBDj8",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
    else{
      let t : token = { 
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODFjYmFkYi1kOGZiLTQzOWYtODY3Yi1hNDFkZTM5M2M4OGQiLCJpYXQiOjE2Njc5Njg1NTAsInN1YiI6ImptYW1hbmkiLCJ1c2VybmFtZSI6ImptYW1hbmkiLCJ1aWQiOjI1MCwiY29tcGFueSI6IkFQUyIsInJvbGUiOlsiZmFrZSIsImZha2UwIl0sIm5iZiI6MTY2Nzk2ODU1MCwiZXhwIjoxNjc3OTc5MTUwLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QifQ.MkQyhRFcRQZbCF55xY2QbWFykfACDobjV5LTd5D5pZU",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "t9+dHoI9JkWaEaLD69Gamg==",
        check_refresh_token: 60
      }
      return t;
    }
  }
}
