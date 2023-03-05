import { Injectable } from '@nestjs/common';
import { main } from './example/main';

@Injectable()
export class AppService {
  execute() {
    return main();
  }
}
