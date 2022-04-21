import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  OWNER = "OWNER",
}

@Entity("users")
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", default: "USER" })
  role: UserRoleEnum;

  @Column({ type: "varchar", unique: true })
  login: string;

  @Column({ type: "varchar" })
  password: string;
}

export default UserEntity;
