import { v4 as uuidv4 } from 'uuid';
import dbAdapter, { Data } from '../database/db.js';

interface DatabaseItem {
  id: string;
  createdDate: Date;
}

class BaseRepository<T extends DatabaseItem> {
  private dbContext: T[];

  private collectionName: string | number;

  constructor(collectionName: keyof Data) {
    this.dbContext = dbAdapter.data[collectionName];
    this.collectionName = collectionName;
  }

  generateId() {
    return uuidv4();
  }

  getAll(): T[] {
    return [...this.dbContext];
  }

  getOne(id: string): T | null {
    return ({ ...this.dbContext.find((item) => item.id === id) } as T) || null;
  }

  create(data: Omit<T, 'id' | 'createdDate'>): T | null {
    const newData = { ...data, createdDate: new Date(), id: this.generateId() };
    this.dbContext.push(newData as T);
    dbAdapter.write();
    return { ...this.dbContext.find((item) => item.id === newData.id) } as T;
  }

  update(updatedItem: T): T | null {
    const index = this.dbContext.findIndex((item) => item.id === updatedItem.id);
    if (index === -1) return null;
    this.dbContext[index] = updatedItem;
    dbAdapter.write();
    return updatedItem;
  }

  delete(id: string): boolean {
    const index = this.dbContext.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.dbContext.splice(index, 1);
    return true;
  }
}

export default BaseRepository;
