import { CreateAboutDto } from './dto/create-about.dto';
import { About } from './about.entity';
import { Repository } from 'typeorm';
import { RemoveAboutDto } from './dto/remove-about.dto';
export declare class AboutService {
    private aboutRepository;
    constructor(aboutRepository: Repository<About>);
    create(createAboutDto: CreateAboutDto): Promise<any>;
    delete(removeAboutDto: RemoveAboutDto): Promise<any>;
    update(updateAboutData: any): Promise<any>;
    findAll(query: any): Promise<any>;
    findOneById(params: any): Promise<any>;
    getCount(): Promise<number>;
}
