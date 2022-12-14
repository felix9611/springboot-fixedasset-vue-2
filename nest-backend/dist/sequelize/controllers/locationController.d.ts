import { LocationTableService } from 'src/sequelize/service/locationTableService';
import { Location } from 'src/sequelize/models/location';
export declare class LocationController {
    private readonly service;
    constructor(service: LocationTableService);
    createOne(location: Location): Promise<Location>;
    updateOne(location: Location): Promise<[affectedCount: number]>;
    getAll(): Promise<Location[]>;
    getOne(id: number): Promise<Location>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    listAll(location: Location): Promise<{
        rows: Location[];
        count: number;
    }>;
    batchCreate(locations: Location[]): Promise<void>;
}
