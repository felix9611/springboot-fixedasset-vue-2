import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { RemoveProductDto } from './dto/remove-product.dto';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<any>;
    delete(removeProductDto: RemoveProductDto): Promise<any>;
    update(updateProductData: any): Promise<any>;
    findAll(query: any): Promise<any>;
    findOneById(id: string): Promise<any>;
    getCount(): Promise<number>;
}
