import { v4 as uuidv4 } from 'uuid';
import dbAdapter, { Data } from '../database/db.js';

class BaseRepository {
  private dbContext: DTask[];

  private collectionName: string;

  constructor(collectionName: keyof Data) {
    this.dbContext = dbAdapter.data[collectionName];
    this.collectionName = collectionName;
  }

  generateId() {
    return uuidv4();
  }

  getAll() {
    return this.dbContext.length > 0 ? [...this.dbContext] : null;
  }

  getOne(id: string) {
    return { ...this.dbContext.find((item) => item.id === id) } || null;
  }

  create(data: ETask) {
    const newData = { ...data, createdDate: new Date(), id: this.generateId() };
    this.dbContext = [...this.dbContext, newData];
    dbAdapter.write();
    return { ...this.dbContext.find((item) => item.id === newData.id) };
  }

  update(newItem: DTask) {
    const index = this.dbContext.findIndex((item) => item.id === newItem.id);
    if (index === -1) return null;
    this.dbContext = [
      ...this.dbContext.slice(0, index),
      newItem,
      ...this.dbContext.slice(index + 1),
    ];
    dbAdapter.write();
    return newItem;
  }

  delete(id: string) {
    const index = this.dbContext.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.dbContext = this.dbContext.filter((item) => item.id !== id);
    return true;
  }
}

export default BaseRepository;
