import Wilder from "../entity/Wilder";
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
}
export default WilderController;
