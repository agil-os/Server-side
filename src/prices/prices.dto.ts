import { QualityEntity } from "src/quality/quality.entity";
import { TripsEntity } from "src/trips/trips.entity";
import { CategoriesEntity } from "src/categories/categories.entity";

export class PricesDto{
    readonly id: number;
    readonly low: number;
    readonly average: number;
    readonly high: number;
    readonly subTotal: number;
    readonly trips: TripsEntity;
    readonly quality: QualityEntity;
    readonly category: CategoriesEntity;
}