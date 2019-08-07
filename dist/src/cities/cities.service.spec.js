"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cities_service_1 = require("./cities.service");
describe('CitiesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [cities_service_1.CitiesService],
        }).compile();
        service = module.get(cities_service_1.CitiesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=cities.service.spec.js.map