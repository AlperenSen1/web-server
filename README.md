#  Messaging API Backend

A robust, production-ready backend API for a messaging application. Built with a focus on modern architecture, data validation, and strict relational integrity.

##  Tech Stack

- **Runtime:** Bun
- **Web Framework:** Hono
- **ORM:** Drizzle ORM
- **Database:** SQLite
- **Validation:** Zod
- **ID Generation:** `@paralleldrive/cuid2`

##  Key Features

- **Secure & URL-Safe IDs:** All database tables (`users`, `threads`, `messages`) utilize **Cuid2** for primary keys, ensuring unpredictable, collision-resistant, and aesthetically clean identifiers.
- **Relational Integrity:** Implements strict foreign key validation. The API actively queries the database to verify the existence of specific users and threads before allowing any message creation, preventing orphan records.
- **Automated Timestamps:** Leverages Drizzle ORM's `$defaultFn` to automatically generate highly precise UTC `sendingTime` timestamps at the schema level.
- **Strict Payload Validation:** Uses Hono's `zValidator` middleware coupled with Zod schemas to rigorously validate all incoming POST requests, returning standardized `400 Bad Request` errors for invalid data.

##  Prerequisites & Installation

Ensure you have [Bun](https://bun.sh/) installed on your system.

1. **Install dependencies:**
   ```bash
   bun install
