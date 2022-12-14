export declare class CodeTypeCreatedDto {
    type: string;
    valueCode: string;
    valueName: string;
}
export declare class CodeTypeFindDto {
    type: string;
    valueCode: string;
    valueName: string;
    limit: number;
    page: number;
}
export declare class CodeTypeFindByTypeDto {
    type: string;
}
export declare class AssetTypeCreateDTO {
    typeCode: string;
    typeName: string;
    typeOtherName: any;
    remark: string;
}
export declare class AssetTypeFindDTO {
    typeCode: string;
    typeName: string;
    limit: number;
    page: number;
}
export declare class VendorFindDTO {
    vendorCode: string;
    vendorName: string;
    limit: number;
    page: number;
}
export declare class vendorCreateDTO {
    vendorCode: string;
    vendorName: string;
    vendorOtherName: any;
    type: string;
    email: string;
    phone: string;
    fax: string;
    address: string;
    contactPerson: string;
    remark: string;
    flexData: any;
}
export declare class departmentCreateDTO {
    deptCode: string;
    deptName: string;
    remark: string;
}
export declare class departmentFindDTO {
    deptCode: string;
    deptName: string;
    limit: number;
    page: number;
}
