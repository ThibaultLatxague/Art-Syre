import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-securite',
  standalone: false,
  templateUrl: './securite.component.html',
  styleUrls: ['./securite.component.scss', '../../app.component.scss']
})
export class SecuriteComponent implements OnInit{ 
  constructor(private authService: AuthService) {}
  utilisateurCourant: Utilisateur | null = null;

  ngOnInit() {
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
  }

}