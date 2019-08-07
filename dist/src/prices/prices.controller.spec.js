"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const prices_controller_1 = require("./prices.controller");
describe('Prices Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [prices_controller_1.PricesController],
        }).compile();
        controller = module.get(prices_controller_1.PricesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=prices.controller.spec.js.map