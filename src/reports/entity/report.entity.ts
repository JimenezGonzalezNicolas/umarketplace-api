import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../../products/entity/product.entity';
import { Student } from '../../students/entity/student.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.reports, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Student, (student) => student.reports, { onDelete: 'CASCADE' })
  reporter: Student;

  @Column({ type: 'varchar', length: 255 })
  reason: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  reportDate: Date;
}
