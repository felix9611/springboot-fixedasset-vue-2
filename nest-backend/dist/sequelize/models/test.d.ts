import { Model } from 'sequelize-typescript';
export declare class Test extends Model {
    code: string;
    testOne: string;
    testTwo: number;
    testJson: number;
    status: number;
    updatedAt: Date;
    createdAt: Date;
}
