import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { Pool } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';

const PORT = 4000;

// ---

const dbParams = {
  user: Deno.env.get('DB_USER') || 'admin',
  password: Deno.env.get('DB_PASSWORS') || 'admin',
  database: Deno.env.get('DB_NAME') || 'deno_db',
  hostname: Deno.env.get('DB_HOST') || 'localhost',
  // hostname: 'gt-db',
  // port: 5432,
  port: Deno.env.get('DB_PORT') || 5432,
  tls: {
    enforce: false,
  },
};

const pool = new Pool(dbParams, 4);

async function runQuery(query: string) {
  const client = await pool.connect();
  let result;
  try {
    result = await client.queryObject(query);
  } finally {
    client.release();
  }
  return result;
}

// CREATE DATABASE deno_db;
// await client.queryArray(
//   'CREATE TABLE t_users (id int PRIMARY KEY, name varchar(250), country varchar(2)); '
// );

// await client.queryArray(
//   "INSERT INTO t_users (id, name, country) VALUES (2, 'Marie Curie', 'FR'); "
// );

// await client.end();

// -----------

const books = new Map<string, any>();
books.set('1', {
  id: '1',
  title: 'Frankenstein',
  author: 'Mary Shelley',
});

const router = new Router();
router
  .get('/', async (ctx) => {
    ctx.response.body = {
      status: 'OK',
      engine: 'Deno',
      server: Deno.hostname(),
    };
  })
  .get('/book', (ctx) => {
    ctx.response.body = Array.from(books.values());
  })
  .get('/users', async (ctx) => {
    console.log('[ HTTP: ]Request for GET /users...');

    const result = await runQuery('SELECT * FROM t_users');
    // console.log(result.rows); // [[1, 'Carlos'], [2, 'John'], ...]

    ctx.response.body = { users: result.rows };
  })
  .get('/users/:id', async (ctx) => {
    console.log('[ HTTP: ]Request for GET /users/ID');

    const result = await runQuery(
      `SELECT * FROM t_users WHERE id=${ctx.params.id}`
    );
    // console.log(result);

    ctx.response.body = { user: result.rows[0] };
  })
  .get('/book/:id', (ctx) => {
    if (ctx.params && ctx.params.id && books.has(ctx.params.id)) {
      ctx.response.body = books.get(ctx.params.id);
    }
  });

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());

console.info(`[INFO:] Gabtec REST API for k8s tests.`);
console.info(`CORS-enabled web server listening on port ${PORT}`);
await app.listen({ port: PORT });

// CREATE TABLE t_users (id int PRIMARY KEY, name varchar(200), country varchar(2));
// INSERT INTO t_users (id, name, country) VALUES (1, 'john doe', 'PT');
// INSERT INTO t_users (id, name, country) VALUES (2, 'marie curie', 'FR');
