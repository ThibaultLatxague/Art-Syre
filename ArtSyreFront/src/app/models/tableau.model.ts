export class Tableau {
    id: number;
    nom: string;
    taille: string;
    prix: number;
    dateCreation: Date;
    estDansUnPanier: boolean;
    estDansMonPanier: boolean;
    estLike: boolean;
    estVendu: boolean;

    constructor(id: number, nom: string, taille: string, prix: number, dateCreation: Date, estDansUnPanier: boolean, estDansMonPanier: boolean, estLike: boolean, estVendu: boolean) {
        this.id = id;
        this.nom = nom;
        this.taille = taille;
        this.prix = prix;
        this.dateCreation = dateCreation;
        this.estDansUnPanier = estDansUnPanier;
        this.estDansMonPanier = estDansMonPanier;
        this.estLike = estLike;
        this.estVendu = estVendu;
    }
}