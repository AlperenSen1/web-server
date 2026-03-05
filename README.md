To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

I started project on cmd, firstly i go to the my C:/projects folder then run this command:
"bun create hono@latest web-server"

then go to the C:/projects/web-server and run the following command, however it(what bun install  command installs) was already installed after the first command which is stated above.
"bun install"

Drizzle ORM allows to write TypeScript code to define tables and make queries. Drizzle translates that TypeScript into SQL

after creating schema.ts and drizzle.config.ts files i run following command(bunx means install and execute)
bunx drizzle-kit push 

i got an driver error and the solution is the following, then i run the bunx command again
bun add -d better-sqlite3

finally there is databse.sqlite file
