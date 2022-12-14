import { CreateBannerDto } from './dto/create-banner.dto';
import { Banner } from './banner.entity';
import { Repository } from 'typeorm';
import { RemoveBannerDto } from './dto/remove-banner.dto';
export declare class BannerService {
    private bannerRepository;
    constructor(bannerRepository: Repository<Banner>);
    create(createBannerDto: CreateBannerDto): Promise<any>;
    delete(removeBannerDto: RemoveBannerDto): Promise<any>;
    update(updateBannerData: any): Promise<any>;
    findAll(query: any): Promise<any>;
    findOneById(id: string): Promise<any>;
    getCount(): Promise<number>;
}
