import { Component, HostListener, OnInit } from '@angular/core';
import { TableauxService } from '../services/tableaux.service';
import { Tableau } from '../models/tableau.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { UtilisateursService } from '../services/utilisateurs.service';
import { Utilisateur } from '../models/utilisateur.model';

@Component({
  selector: 'app-accueil',
  standalone: false,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent implements OnInit {
  dataSource: Tableau[] = [];
  utilisateurCourant: Utilisateur | null = null;

  constructor(private tableauxService: TableauxService, private snackBar: MatSnackBar, private http: HttpClient, private authService: AuthService, private utilisateursService: UtilisateursService) { }

  ngOnInit(): void {
    // Code à exécuter lors de l'initialisation du composant
    this.loadData();
    this.utilisateurCourant = new Utilisateur(0, '', '', '', '', '', false, [], []);
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
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
    if (this.utilisateurCourant && this.utilisateurCourant.tableauxLikes.includes(tableau.id)) {
      // Si le tableau est déjà dans les likes, on le retire
      this.utilisateurCourant.tableauxLikes = this.utilisateurCourant.tableauxLikes.filter((id: number) => id !== tableau.id);
      this.utilisateursService.removeLike(tableau.id.toString()).subscribe();
    } else if (this.utilisateurCourant) {
      // Sinon, on l'ajoute
      this.utilisateurCourant.tableauxLikes.push(tableau.id);
      this.utilisateursService.addLike(tableau.id.toString()).subscribe();
    }

    this.tableauxService.updateLikeStatus(tableau.id.toString()).subscribe({
      next: (res) => {
        tableau.estLike = res.liked;

        if (tableau.estLike) {
          console.log(`Tableau "${tableau.nom}" ajouté aux favoris`);
          this.openSnackBarLikeState(tableau.nom, "ajouté aux");
        } else {
          console.log(`Tableau "${tableau.nom}" retiré des favoris`);
          this.openSnackBarLikeState(tableau.nom, "retiré des");
        }
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du like', err);
        this.snackBar.open('Impossible de modifier le favori', 'Fermer', {
          duration: 3000
        });
      }
    });
  }

  toggleCart(tableau: Tableau) {
    tableau.estDansUnPanier = !tableau.estDansUnPanier;
    // Ici vous pouvez ajouter la logique pour sauvegarder l'état du panier
    if (tableau.estDansUnPanier) {
      console.log(`Tableau "${tableau.nom}" ajouté au panier`);
      this.openSnackBarCartState(tableau.nom, "ajouté au");
    } else {
      this.openSnackBarCartState(tableau.nom, "retiré du");
      console.log(`Tableau "${tableau.nom}" retiré du panier`);
    }
  }

  openSnackBarLikeState(nom:string, status: string) {
    this.snackBar.open(`Tableau "${nom}" ${status} favoris`, 'Fermer', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }

  openSnackBarCartState(nom:string, status: string) {
    this.snackBar.open(`Tableau "${nom}" ${status} panier`, 'Fermer', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}