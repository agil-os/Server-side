"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const trips_controller_1 = require("./trips.controller");
describe('Trips Controller', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [trips_controller_1.TripsController],
        }).compile();
        controller = module.get(trips_controller_1.TripsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=trips.controller.spec.js.map