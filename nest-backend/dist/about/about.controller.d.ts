import { CreateAboutDto } from './dto/create-about.dto';
import { AboutService } from './about.service';
import { About } from './about.entity';
import { RemoveAboutDto } from './dto/remove-about.dto';
import { RetrieveAboutDto } from './dto/retrieve-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { FindAboutDto } from './dto/find-about.dto';
export declare class AboutController {
    private readonly aboutsService;
    constructor(aboutsService: AboutService);
    create(createAboutDto: CreateAboutDto): Promise<About>;
    remove(removeAboutDto: RemoveAboutDto, req: any): Promise<any>;
    update(params: RetrieveAboutDto, updateAboutDto: UpdateAboutDto): Promise<any>;
    findAll(query: FindAboutDto): Promise<About>;
    findOneById(params: RetrieveAboutDto): Promise<any>;
    getCount(): Promise<number>;
}
