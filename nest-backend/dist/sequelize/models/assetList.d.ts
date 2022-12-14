import { Model } from 'sequelize-typescript';
export declare class AssetList extends Model {
    id: number;
    assetCode: string;
    assetName: string;
    typeId: number;
    unit: string;
    buyDate: string;
    description: string;
    sponsor: number;
    sponsorName: string;
    cost: string;
    serialNumber: string;
    invoiceNo: string;
    invoiceDate: string;
    placeId: number;
    deptId: number;
    staffId: String;
    vendorId: number;
    remark: string;
    flexData: any;
    status: number;
    updatedAt: Date;
    createdAt: Date;
    limit: number;
    page: number;
}
