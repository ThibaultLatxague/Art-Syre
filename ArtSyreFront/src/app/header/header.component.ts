import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { UtilisateursService } from '../services/utilisateurs.service';
import { Utilisateur } from '../models/utilisateur.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent { 
  constructor(private utilisateurService: UtilisateursService, private authService: AuthService) { }
  utilisateurCourant: Utilisateur | null = null;

  ngOnInit(): void {
    // Code à exécuter lors de l'initialisation du composant
    this.utilisateurCourant = new Utilisateur(0, '', '', '', '', '', false, [], []);
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
  }
}
