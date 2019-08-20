import { QualityEntity } from "src/quality/quality.entity";
import { TripsEntity } from "src/trips/trips.entity";
import { CategoriesEntity } from "src/categories/categories.entity";

export class PricesDto{
    readonly id: number;
    readonly low: string;
    readonly average: string;
    readonly high: string;
    readonly subTotal: string;
    readonly trips: TripsEntity;
    readonly quality: QualityEntity;
    readonly category: CategoriesEntity;
}