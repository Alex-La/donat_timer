import { DataSourceOptions } from "typeorm";
import models from "../models/idnex";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const isDev = process.env.NODE_ENV === "development";

const ormOptions = (url: string): DataSourceOptions => ({
  type: "postgres",
  url,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: models,
  dropSchema: isDev,
});

export default ormOptions;
