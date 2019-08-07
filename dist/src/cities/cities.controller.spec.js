"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cities_controller_1 = require("./cities.controller");
describe('Cities Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [cities_controller_1.CitiesController],
        }).compile();
        controller = module.get(cities_controller_1.CitiesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=cities.controller.spec.js.map