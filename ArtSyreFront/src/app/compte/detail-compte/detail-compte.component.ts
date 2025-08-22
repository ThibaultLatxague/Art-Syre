import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-detail-compte',
  standalone: false,
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.scss']
})
export class DetailCompteComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  utilisateurCourant: Utilisateur | null = null;
  nombreTableauxLikes: number = 0;
  tableauxDansPanier: number = 0;

  ngOnInit() {
    this.loadCurrentUser();
  }

  onDeconnexion() {
    // Logique de déconnexion
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { id: this.utilisateurCourant?.id, name: this.utilisateurCourant?.prenom + " (vous)", objet: "l'utilisateur" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.deleteAccount().subscribe(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }

  redirigerPanier() {
    // Logique de redirection vers le panier
    this.router.navigate(['/panier']);
  }

  redirigerLikes() {
    // Logique de redirection vers les tableaux likés
    this.router.navigate(['/liste-souhait']);
  }

  private loadCurrentUser(): void {
    // Récupérer l'utilisateur courant
    this.utilisateurCourant = this.authService.getCurrentUserAngular();

    if (this.utilisateurCourant) {
      this.nombreTableauxLikes = this.utilisateurCourant.tableauxLikes ? this.utilisateurCourant.tableauxLikes.length : 0;
      this.tableauxDansPanier = this.utilisateurCourant.tableauxDansPanier ? this.utilisateurCourant.tableauxDansPanier.length : 0;
    }

    console.log("Utilisateur courant dans le header:", this.utilisateurCourant);
  }
}
