# Rocketnotes Api
Application developed to manage user notes.
The system offers several functionalities that allow the user to register, update and filter notes, link useful links, create tags, with each tag being associated with a specific note.

### !Important!
*I was studying some concepts, and I did this project with pure javascript, but soon it will be refactored to typescript, I will put more tests, and leave the entire structure in SOLID*

## How to start the project?

1 - Run `npm install` to install the required dependencies...

2 - Insert the `AUTH_SECRET` and `PORT` in the `.env` file
  - AUTH_SECRET is the unique key to generate the JWT Token
  - PORT is the server port. Recomendend: `3333`or `3000`

3 - Run `npm run dev` and funs!

## 🛠️ Features
- CRUD Account
- CRUD Notes
- CRUD Tags
- CRUD Links
- Filter: Notes, tags and links

## 🖥️ Technologies
- Javascript
- Knex
- JWT
- Express
- SQLite
- Nodemom
- Cors
- PM2
