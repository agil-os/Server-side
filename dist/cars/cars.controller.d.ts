import { CarsService } from './cars.service';
export declare class CarsController {
    private readonly CarsService;
    constructor(CarsService: CarsService);
    getCars(): string;
    createCars(): string;
    deleteCar(): string;
    updateCar(): string;
}
