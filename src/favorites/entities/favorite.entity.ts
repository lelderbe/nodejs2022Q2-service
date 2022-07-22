import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', array: true, default: [] })
  artists: string[]; // favorite artists ids

  @Column({ type: 'varchar', array: true, default: [] })
  albums: string[]; // favorite albums ids

  @Column({ type: 'varchar', array: true, default: [] })
  tracks: string[]; // favorite tracks ids
}
