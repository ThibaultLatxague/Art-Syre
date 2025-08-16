export class Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    dateInscription: Date;
    estAdministrateur: boolean;

    constructor(id: number, nom: string, prenom: string, email: string, motDePasse: string, dateInscription: Date, estAdministrateur: boolean) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.dateInscription = dateInscription;
        this.estAdministrateur = estAdministrateur;
    }
}