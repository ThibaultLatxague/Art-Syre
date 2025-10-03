import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.model';
import { AuthService } from '../../services/auth.service';
import { LogsService } from '../../services/log.service';
import { Log } from '../../models/log.model';

@Component({
  selector: 'app-logs',
  standalone: false,
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit{ 
  constructor(private authService: AuthService, private logsService: LogsService) {}
  utilisateurCourant: Utilisateur | null = null;

  ngOnInit() {
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
  }

  addLog() {
    // Logique pour ajouter un log
    const nouveauLog = new Log(0, 1, 'Description du log', new Date().toISOString());
    this.logsService.createLog(nouveauLog).subscribe(
      response => {
        console.log('Log ajouté avec succès', response);
      },
      error => {
        console.error('Erreur lors de l\'ajout du log', error);
      }
    );
  }
}