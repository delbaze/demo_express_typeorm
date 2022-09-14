import { EntitySchema } from "typeorm";
export default new EntitySchema({
  name: "Wilder",
  tableName: "wilders",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    first_name: {
      type: "varchar",
    },
    last_name: { type: "varchar" },
    age: { type: "int" },
  },
});
