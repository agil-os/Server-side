"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const trips_service_1 = require("./trips.service");
describe('TripsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [trips_service_1.TripsService],
        }).compile();
        service = module.get(trips_service_1.TripsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=trips.service.spec.js.map