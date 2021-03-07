import { resolve } from 'path';
import { existsSync } from 'fs';
import { FileNotFoundError } from '../../error/FileNotFoundError';

export abstract class FileRepository<T> {
  filePath: string;

  constructor(fileName: string) {
    // Data can't be cached here, we want to be sure all() is always returning current data
    this.filePath = resolve(__dirname, '../../', 'data', fileName);
    if (!existsSync(this.filePath)) throw new FileNotFoundError();
  }
}
