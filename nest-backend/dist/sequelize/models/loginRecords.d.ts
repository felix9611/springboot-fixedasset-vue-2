import { Model } from 'sequelize-typescript';
export declare class LoginRecord extends Model {
    username: string;
    ipAddress: string;
    ipLocation: string;
    loginTime: string;
    loginStatus: string;
}
