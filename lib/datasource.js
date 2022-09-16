import typeorm from "typeorm";
import Wilder from "./../entity/Wilder";
import Language from "./../entity/Language";
import Note from "./../entity/Note";

import * as path from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default new typeorm.DataSource({
  type: "sqlite",
  // database: "./../database.sqlite",
  database: path.resolve(__dirname, "../database.sqlite"),
  synchronize: true,
  entities: [Wilder, Language, Note],
  logging: ["query", "error"],
});
