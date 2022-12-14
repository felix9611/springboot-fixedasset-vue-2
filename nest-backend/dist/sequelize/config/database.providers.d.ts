import { Sequelize } from 'sequelize-typescript';
export declare const sequelize: Sequelize;
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<Sequelize>;
}[];
