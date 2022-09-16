import dataSource from "../lib/datasource";
class WilderController {
  constructor() {
    this.db = dataSource.getRepository("Wilder");
  }
  async listWilders() {
    return await this.db.find();
  }

  //récupérer 1 wilder en particulier (à partir de son ID)

  async findWilder(id) {
    // let noteRepository = dataSource.getRepository("Note");
    // return await this.db
    //   .createQueryBuilder()
    //   .leftJoin("note.wilderId", "id")
    //   // .leftJoin('categories.user', 'user')
    //   .where("wilderId= :id", { id })
    //   .getOne();
    return await this.db.findOneBy({ id });
  }

  async createWilder(first_name, last_name, age) {
    //1 ere methode avec create
    let wilder = this.db.create({ first_name, last_name, age });
    return await this.db.save(wilder);

    //2eme methode avec le query builder

    // let wilder = this.db
    //   .createQueryBuilder()
    //   .insert()
    //   .values([{ first_name, last_name, age }])
    //   .execute();

    // return wilder;
  }

  async updateWilder(first_name, last_name, age, id) {
    return (
      this.db
        .createQueryBuilder()
        .update()
        .set({ first_name, last_name, age })
        // .where(`id=${id}`) // id=10
        .where("id= :id", { id }) // id=10
        .execute()
    );
  }

  async deleteWilder(id) {
    return this.db
      .createQueryBuilder()
      .delete()
      .where("id= :id", { id })
      .execute();
  }

  async assignNoteLanguage(languageId, wilderId, note) {
    let languageRepository = dataSource.getRepository("Language");
    let noteRepository = dataSource.getRepository("Note");
    let language = await languageRepository.findOneBy({ id: languageId });
    if (!language) {
      throw new Error("ce langage n'existe pas");
    }
    let wilder = await this.db.findOneBy({ id: wilderId });
    if (!wilder) {
      throw new Error("ce wilder n'existe pas");
    }
    let previousNote = await noteRepository.findOneBy({ wilder, language });
    console.log(
      "🟩🟩🟩🟩🟩 ~ file: Wilder.js ~ line 64 ~ WilderController ~ assignNoteLanguage ~ previousNote",
      previousNote
    );
    // if (previousNote) {
    //   throw new Error("une note existe déjà");
    // }
    let newNote = noteRepository.save({
      ...previousNote,
      language: languageId,
      wilder: wilderId,
      note,
    });
    // let newNote = noteRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .values([{ language: languageId, wilder: wilderId, note }])
    //   .execute();

    return newNote;
    // return {};
  }
}
export default WilderController;
