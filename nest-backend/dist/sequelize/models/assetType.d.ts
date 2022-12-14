import { Model } from 'sequelize-typescript';
export declare class AssetType extends Model {
    id: number;
    typeCode: string;
    typeName: string;
    typeOtherName: any;
    remark: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    limit: number;
    page: number;
}
