import { CreateProductCategoriesDto } from './dto/create-product-categories.dto';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategories } from './product-categories.entity';
import { RemoveProductCategoriesDto } from './dto/remove-product-categories.dto';
import { RetrieveProductCategoriesDto } from './dto/retrieve-product-categories.dto';
import { UpdateProductCategoriesDto } from './dto/update-product-categories.dto';
import { FindProductCategoriesDto } from './dto/find-product-categories.dto';
export declare class ProductCategoriesController {
    private readonly productCategoriesService;
    constructor(productCategoriesService: ProductCategoriesService);
    create(createProductCategoriesDto: CreateProductCategoriesDto): Promise<ProductCategories>;
    remove(removeProductCategoriesDto: RemoveProductCategoriesDto, req: any): Promise<any>;
    update(params: RetrieveProductCategoriesDto, updateProductCategoriesDto: UpdateProductCategoriesDto): Promise<any>;
    findAll(query: FindProductCategoriesDto): Promise<ProductCategories>;
    findOneById(params: RetrieveProductCategoriesDto): Promise<any>;
    getCount(): Promise<number>;
}
