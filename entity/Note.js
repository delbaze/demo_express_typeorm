import { EntitySchema } from "typeorm";
export default new EntitySchema({
  name: "Note",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    note: {
      type: "int",
    },
  },
  relations: {
    language: {
      target: "Language",
      type: "many-to-one",
      eager: true,
    },
    wilder: {
      target: "Wilder",
      type: "many-to-one",
      eager: true,
    },
  },
});
