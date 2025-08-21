export class Tableau {
    id: number;
    nom: string;
    taille: string;
    prix: number;
    dateCreation: Date;
    estDansUnPanier: boolean;
    estVendu: boolean;

    constructor(id: number, nom: string, taille: string, prix: number, dateCreation: Date, estDansUnPanier: boolean, estVendu: boolean) {
        this.id = id;
        this.nom = nom;
        this.taille = taille;
        this.prix = prix;
        this.dateCreation = dateCreation;
        this.estDansUnPanier = estDansUnPanier;
        this.estVendu = estVendu;
    }
}