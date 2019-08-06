export interface Cat {
    id?: number;
    name?: string;
    age?: number;
}
export interface IQuery {
    getCats(): Cat[] | Promise<Cat[]>;
    cat(id: string): Cat | Promise<Cat>;
}
