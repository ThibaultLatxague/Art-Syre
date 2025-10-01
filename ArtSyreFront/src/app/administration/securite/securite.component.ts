import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-securite',
  standalone: false,
  templateUrl: './securite.component.html',
  styleUrls: ['./securite.component.scss']
})
export class SecuriteComponent implements OnInit{ 
  constructor(private authService: AuthService) {}
  utilisateurCourant: Utilisateur | null = null;

  ngOnInit() {
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
  }

}