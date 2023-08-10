import { Model, ModelCtor } from 'sequelize-typescript';
import { MakeNullishOptional } from 'sequelize/types/utils';
import CustomError from '../helpers/CustomError.js';

const notFoundError = (id: string) => new CustomError(`Item with id: ${id} not found`, 404);

class BaseRepository<T extends Model> {
  private dbContext: ModelCtor<T>;

  constructor(dbContext: ModelCtor<T>) {
    this.dbContext = dbContext;
  }

  async getAll(): Promise<T[]> {
    return this.dbContext.findAll();
  }

  async getOne(id: string): Promise<T> {
    const item = await this.dbContext.findByPk(id);
    if (!item) throw notFoundError(id);
    return item;
  }

  async create(data: MakeNullishOptional<T>): Promise<T> {
    const item = await this.dbContext.create(data);
    return item;
  }

  async update(id: string, updatedData: Partial<T>): Promise<T> {
    const item = await this.dbContext.findByPk(id);
    if (!item) throw notFoundError(id);
    const newItem = await item.update(updatedData);
    return newItem;
  }

  async delete(id: string): Promise<boolean> {
    const item = await this.dbContext.findByPk(id);
    if (!item) throw notFoundError(id);
    const deletedItemCount = item.destroy();
    return !!deletedItemCount;
  }
}

export default BaseRepository;
