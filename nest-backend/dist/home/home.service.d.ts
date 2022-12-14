import { CreateHomeDto } from './dto/create-home.dto';
import { Home } from './home.entity';
import { Repository } from 'typeorm';
import { RemoveHomeDto } from './dto/remove-home.dto';
export declare class HomeService {
    private homeRepository;
    constructor(homeRepository: Repository<Home>);
    create(createHomeDto: CreateHomeDto): Promise<any>;
    delete(removeHomeDto: RemoveHomeDto): Promise<any>;
    update(updateHomeData: any): Promise<any>;
    findAll(query: any): Promise<any>;
    findOneById(id: string): Promise<any>;
    getCount(): Promise<number>;
}
