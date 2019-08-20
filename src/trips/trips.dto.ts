import { UsersEntity } from "src/users/users.entity";
import { QualityEntity } from "src/quality/quality.entity";
import { CategoriesEntity } from "src/categories/categories.entity";

export class TripsDto {
    readonly id: number;
    readonly name: string;
    readonly departureDate: string;
    readonly arrivalDate: string;
    readonly origin: string;
    readonly destination: string;
    readonly pic: string;
    readonly isRental: boolean;
    readonly total: string;
    readonly user: UsersEntity;
    readonly quality: QualityEntity;
    readonly lodging: CategoriesEntity;
    readonly transportation: CategoriesEntity;
}