import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './product.service';
import { Product } from './product.entity';
import { RemoveProductDto } from './dto/remove-product.dto';
import { RetrieveProductDto } from './dto/retrieve-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    remove(removeProductDto: RemoveProductDto, req: any): Promise<any>;
    update(params: RetrieveProductDto, updateProductDto: UpdateProductDto): Promise<any>;
    findAll(query: FindProductDto): Promise<Product>;
    findOneById(params: RetrieveProductDto): Promise<any>;
    getCount(): Promise<number>;
}
