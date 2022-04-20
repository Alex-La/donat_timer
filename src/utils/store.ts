import { DataSource, Repository } from "typeorm";
import UserEntity, { UserRoleEnum } from "../models/entities/UserEntity";
import bcrypt from "bcrypt";

const OWNER_LOGIN = process.env.OWNER_LOGIN!!;
const OWNER_PASS = process.env.OWNER_PASS!!;

export type Store = {
  userRepo: Repository<UserEntity>;
};

const Store = (dataSource: DataSource): Store => {
  const userRepo = dataSource.getRepository(UserEntity);

  userRepo.save(generateOwner());

  return { userRepo };
};

const generateOwner = (): UserEntity => {
  const owner = new UserEntity();
  owner.role = UserRoleEnum.OWNER;
  owner.login = OWNER_LOGIN;
  owner.password = bcrypt.hashSync(OWNER_PASS, 12);
  return owner;
};

export default Store;
