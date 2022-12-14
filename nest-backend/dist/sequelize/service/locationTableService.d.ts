import { Location } from 'src/sequelize/models/location';
export declare class LocationTableService {
    private locationRepository;
    constructor(locationRepository: typeof Location);
    createOne(location: Location): Promise<Location>;
    getAll(): Promise<Location[]>;
    getOne(id: number): Promise<Location>;
    updateOne(location: Location): Promise<[affectedCount: number]>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    listPage(location: Location): Promise<{
        rows: Location[];
        count: number;
    }>;
    findInfo(placeCode?: string, placeName?: string): Promise<Location>;
}
