export class Log {
    id: number;
    categories_log_id: number;
    description: string;
    dateCreation: string;

    constructor(id: number, categories_log_id: number, description: string, dateCreation: string) {
        this.id = id;
        this.categories_log_id = categories_log_id;
        this.description = description;
        this.dateCreation = dateCreation;
    }
}