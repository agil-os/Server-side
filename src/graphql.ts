
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface Cat {
    id?: number;
    name?: string;
    age?: number;
}

export interface HotelSample {
    name?: string;
    id?: string;
}

export interface IQuery {
    getCats(): Cat[] | Promise<Cat[]>;
    cat(id: string): Cat | Promise<Cat>;
    hello(): string | Promise<string>;
}
