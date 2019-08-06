import { CitiesService } from './cities.service';
export declare class CitiesController {
    private readonly CitiesService;
    constructor(CitiesService: CitiesService);
    findCity(): string;
    createCity(): string;
    deleteCity(): string;
    updateCity(): string;
}
