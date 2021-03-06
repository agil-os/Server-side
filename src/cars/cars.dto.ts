import { TripsEntity } from "src/trips/trips.entity";

export class CarsDto {
    readonly id: number;
    readonly tripDistance: string;
    readonly pricePerGal: string;
    readonly total: string;
    readonly trips: TripsEntity;
}