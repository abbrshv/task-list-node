import { v4 as uuidv4 } from 'uuid';
import dbAdapter, { Data } from '../database/db.js';

class BaseRepository {
  dbContext: DTask[]; // Should support other types

  collectionName: string;

  constructor(collectionName: keyof Data) {
    this.dbContext = dbAdapter.data[collectionName];
    this.collectionName = collectionName;
  }

  generateId() {
    return uuidv4();
  }

  getAll() {
    return [...this.dbContext];
  }

  getOne(id: string) {
    return { ...this.dbContext.find((item) => item.id === id) };
  }

  create(data: ETask) {
    const newData = { ...data, createdDate: new Date(), id: this.generateId() };
    this.dbContext = [...this.dbContext, newData];
    dbAdapter.write();
    return { ...this.dbContext.find((item) => item.id === newData.id) };
  }

  update(id: string, dataToUpdate: object) {
    const oldData = this.dbContext.find((item) => item.id === id);
    if (!oldData) return null;
    const newData = { ...oldData, ...dataToUpdate };
    this.dbContext = [...this.dbContext.filter((item) => item.id !== id), newData];
    dbAdapter.write();
    return newData;
  }

  delete(id: string) {
    const index = this.dbContext.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.dbContext = this.dbContext.filter((item) => item.id !== id);
    return true;
  }
}

export default BaseRepository;
