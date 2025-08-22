import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Utilisateur } from '../../models/utilisateur.model';

@Component({
  selector: 'app-administration',
  standalone: false,
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent implements OnInit {
  constructor(private authService: AuthService) {}
  utilisateurCourant: Utilisateur | null = null;

  ngOnInit() {
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
  }

}
