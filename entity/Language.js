import { EntitySchema } from "typeorm";
export default new EntitySchema({
  name: "Language",
  tableName: "languages",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    label: {
      type: "varchar",
      unique: true // le label ne pourra jamais être injecté 2 fois en base
    },
  },
});
