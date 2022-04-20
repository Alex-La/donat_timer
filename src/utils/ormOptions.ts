import { DataSourceOptions } from "typeorm";
import models from "../models/idnex";

const isDev = process.env.NODE_ENV === "development";

const ormOptions = (url: string): DataSourceOptions => ({
  type: "postgres",
  url,
  synchronize: true,
  logging: false,
  entities: models,
  dropSchema: isDev,
});

export default ormOptions;
