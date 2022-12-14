import { Model } from 'sequelize-typescript';
export declare class CodeType extends Model {
    type: string;
    valueCode: string;
    valueName: string;
    status: number;
    limit: number;
    page: number;
}
