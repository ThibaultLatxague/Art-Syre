import { Component, HostListener, OnInit } from '@angular/core';
import { TableauxService } from '../services/tableaux.service';
import { Tableau } from '../models/tableau.model';

@Component({
  selector: 'app-accueil',
  standalone: false,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent implements OnInit {
  dataSource: Tableau[] = [];

  constructor(private tableauxService: TableauxService) { }

  ngOnInit(): void {
    // Code à exécuter lors de l'initialisation du composant
    this.loadData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Force la recalculation de la grille lors du redimensionnement
  }

  getGridCols(): number {
    const width = window.innerWidth;
    if (width > 1200) {
      return 3; // 3 colonnes pour les grands écrans
    } else if (width > 768) {
      return 2; // 2 colonnes pour les écrans moyens
    } else {
      return 1; // 1 colonne pour les petits écrans
    }
  }

  private loadData(): void {
    // Récupérer les tableaux et les assigner à la source de données
    this.tableauxService.getTableaux().subscribe((tableaux: Tableau[]) => {
      this.dataSource = tableaux;
    });
  }

  toggleLike(tableau: Tableau) {
    tableau.estLike = !tableau.estLike;
    // Ici vous pouvez ajouter la logique pour sauvegarder l'état
    if (tableau.estLike) {
      console.log(`Produit "${tableau.nom}" ajouté aux favoris`);
    } else {
      console.log(`Produit "${tableau.nom}" retiré des favoris`);
    }
  }

  toggleCart(tableau: Tableau) {
    tableau.estDansUnPanier = !tableau.estDansUnPanier;
    // Ici vous pouvez ajouter la logique pour sauvegarder l'état du panier
    if (tableau.estDansUnPanier) {
      console.log(`Produit "${tableau.nom}" ajouté au panier`);
    } else {
      console.log(`Produit "${tableau.nom}" retiré du panier`);
    }
  }
}