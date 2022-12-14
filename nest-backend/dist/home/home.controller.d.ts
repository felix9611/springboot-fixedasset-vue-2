import { CreateHomeDto } from './dto/create-home.dto';
import { HomeService } from './home.service';
import { Home } from './home.entity';
import { RemoveHomeDto } from './dto/remove-home.dto';
import { RetrieveHomeDto } from './dto/retrieve-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { FindHomeDto } from './dto/find-home.dto';
export declare class HomeController {
    private readonly homesService;
    constructor(homesService: HomeService);
    create(createHomeDto: CreateHomeDto): Promise<Home>;
    remove(removeHomeDto: RemoveHomeDto, req: any): Promise<any>;
    update(params: RetrieveHomeDto, updateHomeDto: UpdateHomeDto): Promise<any>;
    findAll(query: FindHomeDto): Promise<Home>;
    findOneById(params: RetrieveHomeDto): Promise<any>;
    getCount(): Promise<number>;
}
