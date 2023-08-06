import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

export interface Data {
  [key: string]: any[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, 'database.json');

const defaultData: Data = { tasks: [] };
const adapter = new JSONFile<Data>(dbFile);
const dbAdapter = new Low<Data>(adapter, defaultData);

await dbAdapter.read();
await dbAdapter.write();

export default dbAdapter;
