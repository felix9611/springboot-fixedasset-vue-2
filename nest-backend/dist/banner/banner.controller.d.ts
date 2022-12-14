import { CreateBannerDto } from './dto/create-banner.dto';
import { BannerService } from './banner.service';
import { Banner } from './banner.entity';
import { RemoveBannerDto } from './dto/remove-banner.dto';
import { RetrieveBannerDto } from './dto/retrieve-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FindBannerDto } from './dto/find-banner.dto';
export declare class BannerController {
    private readonly bannersService;
    constructor(bannersService: BannerService);
    create(createBannerDto: CreateBannerDto): Promise<Banner>;
    remove(removeBannerDto: RemoveBannerDto, req: any): Promise<any>;
    update(params: RetrieveBannerDto, updateBannerDto: UpdateBannerDto): Promise<any>;
    findAll(query: FindBannerDto): Promise<Banner>;
    findOneById(params: RetrieveBannerDto): Promise<any>;
    getCount(): Promise<number>;
}
