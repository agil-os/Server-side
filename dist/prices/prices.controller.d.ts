import { PricesService } from './prices.service';
export declare class PricesController {
    private readonly PricesService;
    constructor(PricesService: PricesService);
    getPrices(): string;
    createPrices(): string;
    deletePrices(): string;
    updatePrices(): string;
}
