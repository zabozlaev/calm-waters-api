import { Repository, FindOneOptions } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseRepo<T> extends Repository<T> {
  async findOrThrow(findOptions: FindOneOptions<T>) {
    const data = await this.findOne(findOptions);

    if (!data) {
      throw new HttpException('Resource was not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }
}
