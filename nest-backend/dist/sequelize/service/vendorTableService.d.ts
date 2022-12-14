import { Vendor } from 'src/sequelize/models/vendor';
export declare class VendorTableService {
    private vendorRepository;
    constructor(vendorRepository: typeof Vendor);
    createOne(vendor: Vendor): Promise<Vendor>;
    updateOne(vendor: Vendor): Promise<[affectedCount: number]>;
    getAll(): Promise<Vendor[]>;
    getOne(id: number): Promise<Vendor>;
    voidOne(id: number): Promise<[affectedCount: number]>;
    listPage(vendor: Vendor): Promise<{
        rows: Vendor[];
        count: number;
    }>;
    findInfo(vendorCode?: string, vendorName?: string): Promise<Vendor>;
}
