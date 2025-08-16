export class Utilisateur {
    id: number;
    name: string;
    prenom: string;
    email: string;
    password: string;
    dateCreation: string;
    estAdmin: boolean;

    constructor(id: number, name: string, prenom: string, email: string, password: string, dateCreation: string, estAdmin: boolean) {
        this.id = id;
        this.name = name;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.dateCreation = dateCreation;
        this.estAdmin = estAdmin;
    }
}