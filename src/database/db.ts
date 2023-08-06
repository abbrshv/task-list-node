import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

export interface Data {
  [key: string]: any[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, 'database.json');

const defaultData: Data = { tasks: [] };
const adapter = new JSONFileSync<Data>(dbFile);
const dbAdapter = new LowSync<Data>(adapter, defaultData);

dbAdapter.read();
dbAdapter.write();

export default dbAdapter;
