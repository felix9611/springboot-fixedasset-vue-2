import { VendorTableService } from 'src/sequelize/service/vendorTableService';
import { Vendor } from 'src/sequelize/models/vendor';
export declare class VendorController {
    private readonly service;
    constructor(service: VendorTableService);
    getAll(): Promise<Vendor[]>;
    listAll(vendor: Vendor): Promise<{
        rows: Vendor[];
        count: number;
    }>;
    getOne(id: number): Promise<Vendor>;
    createOne(vendor: Vendor): Promise<Vendor>;
    updateOne(vendor: Vendor): Promise<[affectedCount: number]>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    batchCreate(vendors: Vendor[]): Promise<void>;
}
