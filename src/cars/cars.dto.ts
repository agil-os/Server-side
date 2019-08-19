import { TripsEntity } from "src/trips/trips.entity";

export class CarsDto {
    readonly id: number;
    readonly isRental: boolean;
    readonly tripDistance: string;
    readonly pricePerGal: number;
    readonly total: number;
    readonly trips: TripsEntity;
}