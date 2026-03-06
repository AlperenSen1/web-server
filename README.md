To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

I started project on cmd, firstly i went to my C:/projects folder then ran this command:
"bun create hono@latest web-server"

then i went to  C:/projects/web-server and ran the following command, however it(what bun install  command installs) was already installed after the first command which is stated above.
"bun install"

Drizzle ORM allows writing TypeScript code to define tables and make queries. Drizzle translates that TypeScript into SQL

after creating schema.ts and drizzle.config.ts files i ran following command(bunx means install and execute):
bunx drizzle-kit push 

i got a driver error and the solution was the following, then i ran the bunx command again:
bun add -d better-sqlite3

finally there was databse.sqlite file
