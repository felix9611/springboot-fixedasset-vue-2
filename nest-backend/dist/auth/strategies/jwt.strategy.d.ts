declare const JwtStrategyUser_base: new (...args: any[]) => any;
export declare class JwtStrategyUser extends JwtStrategyUser_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        username: any;
        status: any;
        roles: any;
        department: any;
        phone: any;
        avatar: any;
        departmentName: any;
        departmentId: any;
        areaId: any;
    }>;
}
export {};
