import { Model } from 'sequelize-typescript';
export declare class Location extends Model {
    placeCode: string;
    placeName: string;
    remark: string;
    flexData: any;
    status: number;
    limit: number;
    page: number;
    active: number;
}
