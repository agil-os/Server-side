import { TripsService } from './trips.service';
export declare class TripsController {
    private readonly TripsService;
    constructor(TripsService: TripsService);
    findTrip(): string;
    createTrip(): string;
    deleteTrip(): string;
    updateATrip(): string;
}
