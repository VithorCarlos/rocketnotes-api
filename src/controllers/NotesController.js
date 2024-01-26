const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    const linksInsert = links.map((link) => ({ note_id, url: link }));

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map((name) => ({ note_id, name, user_id }));

    await knex("tags").insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const { note_id } = request.params;

    const note = await knex("notes").where({ id: note_id }).first();
    const tags = await knex("tags").where({ note_id }).orderBy("name");
    const links = await knex("links").where({ note_id }).orderBy("created_at");

    return response.json({
      ...note,
      tags,
      links,
    });
  }

  async listAll(request, response) {
    const user_id = request.user.id;
    const { title, tags } = request.query;

    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());
      notes = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.description",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.title");
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });

    const notesWithTags = notes.map((note) => {
      const filteredTags = userTags.filter((tag) => note.id === tag.note_id);

      return {
        ...note,
        tags: filteredTags,
      };
    });

    return response.json(notesWithTags);
  }

  async delete(request, response) {
    const { note_id } = request.params;

    await knex("notes").where({ id: note_id }).delete();

    return response.json();
  }

  async update(request, response) {
    const { title, description } = request.body;

    const { note_id } = request.params;

    await knex("notes").where({ id: note_id }).update({
      title,
      description,
    });

    return response.json({ title, description });
  }
}

module.exports = NotesController;
