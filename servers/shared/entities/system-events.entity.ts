import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class SystemEvents {
  @ObjectIdColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  data: any;

  @Column()
  time: Date;

  @Column()
  epochTime: number;

  @Column()
  serverName?: string;


}

// {
//     "type": "ResetPeopleCount",
//     "data": {
//       "count": 2
//     },
//     "time": "Wed Feb 02 2022 09:00:27 GMT+0200 (שעון ישראל (חורף))",
//     "epochTime": 1643785227167,
//     "id": 1320
//   },