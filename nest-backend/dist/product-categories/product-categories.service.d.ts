import { CreateProductCategoriesDto } from './dto/create-product-categories.dto';
import { ProductCategories } from './product-categories.entity';
import { Repository } from 'typeorm';
import { RemoveProductCategoriesDto } from './dto/remove-product-categories.dto';
export declare class ProductCategoriesService {
    private productCategoriesRepository;
    constructor(productCategoriesRepository: Repository<ProductCategories>);
    create(createProductCategoriesDto: CreateProductCategoriesDto): Promise<any>;
    delete(removeProductCategoriesDto: RemoveProductCategoriesDto): Promise<any>;
    update(updateProductCategoriesData: any): Promise<any>;
    findAll(query: any): Promise<any>;
    findOneById(id: string): Promise<any>;
    getCount(): Promise<number>;
}
