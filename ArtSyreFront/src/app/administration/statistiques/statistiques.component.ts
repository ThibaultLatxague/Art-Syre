import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-statistiques',
  standalone: false,
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss', '../../app.component.scss']
})
export class StatistiquesComponent implements OnInit{ 
  constructor(private authService: AuthService) {}
  utilisateurCourant: Utilisateur | null = null;

  ngOnInit() {
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
  }

}