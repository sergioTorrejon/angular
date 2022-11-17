import { Injectable, Logger, LoggerService, Scope } from '@nestjs/common';
import { fullTimeStamp } from 'src/utils/libs/format/datetime.format';
import { AppEndFile } from 'src/utils/helpers/file-manager/update/update.file';
import { pathStorageLogs } from 'src/utils/helpers/path/join,path';


@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger implements LoggerService {
  private context?: string;
  public logger = new Logger()

  public setContext(context: string): void {
    this.context = context;
    this.logger = new Logger(this.context)

  }

//BUSSINES LOGGER
  start(message: string='Iniciando...') {
    logger.setContext(`START`)
    AppEndFile(pathStorageLogs('debug'),'debug.log',`\n\n\n----------------------`)
    this.debug(message)
  }

  debug( message: string='') {
    AppEndFile(pathStorageLogs('debug'),'debug.log',`${fullTimeStamp()}--[${this.context}]-- ${message}`)
    this.logger.debug(message.toLowerCase())
  }

  log(message: string='' ) {
    AppEndFile(pathStorageLogs('log'),'log.log',`${fullTimeStamp()}--[${this.context}]-- ${message}`)
    this.logger.log(message)
  }

  error(message: string='') {
    AppEndFile(pathStorageLogs('error'),'error.log',`${fullTimeStamp()}--[${this.context}]-- ${message}`)
    this.logger.error(message)
  }

  warn( ) {
    console.log('warn',this.context)
  }

  info(message: string='') {
    AppEndFile(pathStorageLogs('info'),'info.log',`${fullTimeStamp()}--[${this.context}]-- ${message}`)
    this.logger.verbose(message)
  }

}

export const logger = new AppLogger()