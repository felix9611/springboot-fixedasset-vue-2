import { Model } from 'sequelize-typescript';
export declare class Vendor extends Model {
    vendorCode: string;
    vendorName: string;
    vendorOtherName: any;
    type: string;
    email: string;
    phone: string;
    fax: string;
    address: string;
    contactPerson: string;
    remark: string;
    flexData: any;
    status: number;
    limit: number;
    page: number;
    active: number;
}
