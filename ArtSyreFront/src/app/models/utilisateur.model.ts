export class Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    dateCreation: string;
    estAdministrateur: boolean;

    constructor(id: number, nom: string, prenom: string, email: string, password: string, dateCreation: string, estAdministrateur: boolean) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.dateCreation = dateCreation;
        this.estAdministrateur = estAdministrateur;
    }
}