import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seo-google',
  standalone: false,
  templateUrl: './seo-google.component.html',
  styleUrls: ['./seo-google.component.scss', '../../app.component.scss']
})
export class SEOGoogleComponent implements OnInit{ 
  constructor(private authService: AuthService) {}
  utilisateurCourant: Utilisateur | null = null;

  ngOnInit() {
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
  }

}