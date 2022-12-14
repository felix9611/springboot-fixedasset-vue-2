import { Model } from 'sequelize-typescript';
export declare class CodeType extends Model {
    id: number;
    type: string;
    valueCode: string;
    valueName: string;
    status: number;
    updatedAt: Date;
    createdAt: Date;
    limit: number;
    page: number;
}
