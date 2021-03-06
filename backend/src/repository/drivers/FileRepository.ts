import { IRepository } from './IRepository';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { FileNotFoundError } from '../../error/FileNotFound.error';

export abstract class FileRepository<T> implements IRepository<T> {
  filePath: string;

  constructor(fileName: string) {
    // Data can't be cached here, we want to be sure all() is always returning current data
    this.filePath = resolve(__dirname, '../../', 'data', fileName);
    if (!existsSync(this.filePath)) throw new FileNotFoundError();
  }

  all(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
}
