import { InMemoryDbService  } from 'angular-in-memory-web-api';
import Products from '../api/products/products.data';

export class InMemoryDataService extends InMemoryDbService {
    createDb() {
        return {products : Products};
    }
}
