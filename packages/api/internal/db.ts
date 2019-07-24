import { once } from "lodash";
import { createPool, Pool, PoolConnection } from "mysql";
import { MYSQL_CONNECTION_LIMIT, MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from "shared/etc";
export let db: Pool;
const callbacks: Array<() => void> = [];
const connectOnce = once(() => {
  const pool = createPool({
    bigNumberStrings: true,
    charset: "utf8bm4",
    connectionLimit: MYSQL_CONNECTION_LIMIT,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    password: MYSQL_PASSWORD,
    port: MYSQL_PORT,
    user: MYSQL_USER,
  });
  db.on("connection", once(() => {
    db = pool;
  }));
  db.on("error", () => {
    process.exit(2);
  });
});

export function connect() {
  if (db) { return Promise.resolve(); }
  return new Promise((r) => {
    callbacks.push(r);
    connectOnce();
  });
}
export function select<T>(sql: string, values: any, connection: PoolConnection | Pool = db) {
  return new Promise<T[]>((resolve, reject) => {
    connection.query({ sql, values }, (err, results) => {
      if (err) { return reject(err); }
      resolve(results);
    });
  });
}

export function selectOne<T>(sql: string, values: any, connection: PoolConnection | Pool = db): Promise<T | null> {
  return new Promise<T | null>((resolve, reject) => {
    connection.query({ sql, values }, (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 1) {
        resolve(results[0]);
      } else if (results.length === 0) {
        resolve(null);
      } else {
        reject(new Error("select one return more then on result"));
      }
    });
  });
}

export function insert(sql: string, values: any, connection: PoolConnection | Pool = db): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) { return reject(err); }
      resolve(results);
    });
  });
}

export function update(sql: string, values: any, connection: PoolConnection | Pool = db): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) { return reject(err); }
      resolve(results);
    });
  });
}

export function remove(sql: string, values: any, connection: PoolConnection | Pool = db): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) { return reject(err); }
      resolve(results);
    });
  });
}

export async function transaction<T>(callback: (connection: PoolConnection) => Promise<T>) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, co) => {
      if (err) { return reject(err); }
      co.beginTransaction((txErr) => {
        if (txErr) { return reject(txErr); }
        callback(co).then((res) => {
          co.commit((commitErr) => {
            if (commitErr) { return reject(commitErr); }
            resolve(res);
          });
        }, (rollbackErr) => {
          co.rollback();
          reject(rollbackErr);
        }).finally(() => {
          co.release();
        });
      });
    });
  });
}
