import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from "path";
import { User } from "./entities/User";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export default {
  migrations: {
    path: path.join(__dirname, "migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: "lireddit",
  type: "postgresql",
  debug: !__prod__,
  metadataProvider: TsMorphMetadataProvider,
} as Parameters<typeof MikroORM.init>[0];
