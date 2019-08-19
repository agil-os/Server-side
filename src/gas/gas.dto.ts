import { CarsEntity } from "src/cars/cars.entity";

export class GasDto {
    readonly id: number;
    readonly pricePerGal: number;
    readonly cars: CarsEntity;
}