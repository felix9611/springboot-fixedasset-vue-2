import { Model } from 'sequelize-typescript';
export declare class AssetType extends Model {
    typeCode: string;
    typeName: string;
    typeOtherName: any;
    remark: string;
    status: number;
    limit: number;
    page: number;
    dataValue: any;
}
