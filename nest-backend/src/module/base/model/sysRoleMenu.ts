import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'sys_role_menu' })
export class SysRoleMenu extends Model{

  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @Column(DataType.INTEGER)
  roleId: number

  @Column(DataType.INTEGER)
  menuId: number
}