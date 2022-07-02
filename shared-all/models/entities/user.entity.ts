import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Role } from '@shared-all/enums/role.enum';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: Role;
}


