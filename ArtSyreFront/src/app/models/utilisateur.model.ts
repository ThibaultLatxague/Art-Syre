export class Utilisateur {
    id: number;
    name: string;
    prenom: string;
    email: string;
    password: string;
    dateCreation: string;
    estAdmin: boolean;
    tableauxLikes: number[];
    tableauxDansPanier: number[];

    constructor(id: number, name: string, prenom: string, email: string, password: string, dateCreation: string, estAdmin: boolean, tableauxLikes: number[], tableauxDansPanier: number[]) {
        this.id = id;
        this.name = name;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.dateCreation = dateCreation;
        this.estAdmin = estAdmin;
        this.tableauxLikes = tableauxLikes;
        this.tableauxDansPanier = tableauxDansPanier;
    }
}