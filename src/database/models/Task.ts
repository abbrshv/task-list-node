import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
class Task extends Model<DTask, ETask> {
  @AllowNull(false)
  @Column(DataType.STRING)
  public name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  public category!: 'task' | 'random thought' | 'idea';

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content!: string;

  @Column(DataType.TEXT)
  public dates?: string | null;

  @Column(DataType.BOOLEAN)
  public isArchived?: boolean;

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  public declare id: string;

  @CreatedAt
  @Column(DataType.DATE)
  public declare readonly createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  public declare readonly updatedAt: Date;
}

export default Task;
