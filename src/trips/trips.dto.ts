export class TripsDto {
    readonly id: number;
    readonly name: string;
    readonly departureDate: string;
    readonly arrivalDate: string;
    readonly origin: string;
    readonly destination: string;
    readonly userId: number;
    readonly qualityId: number;
    readonly lodgingId: number;
    readonly transportationId: number;
}