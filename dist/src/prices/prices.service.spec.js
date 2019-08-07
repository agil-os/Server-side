"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const prices_service_1 = require("./prices.service");
describe('PricesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [prices_service_1.PricesService],
        }).compile();
        service = module.get(prices_service_1.PricesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=prices.service.spec.js.map