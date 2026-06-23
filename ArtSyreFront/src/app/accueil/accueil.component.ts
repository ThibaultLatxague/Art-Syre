import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
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
export class AccueilComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: Tableau[] = [];
  utilisateurCourant: Utilisateur | null = null;

  @ViewChildren('paintingScene') paintingScenes!: QueryList<ElementRef>;
  private scrollObserver!: IntersectionObserver;

  constructor(
    private tableauxService: TableauxService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private authService: AuthService,
    private utilisateursService: UtilisateursService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.utilisateurCourant = new Utilisateur(0, '', '', '', '', '', false, [], []);
    this.utilisateurCourant = this.authService.getCurrentUserAngular();
  }

  ngAfterViewInit(): void {
    this.setupScrollObserver();

    // Re-observe scenes that appear after async data loads
    this.paintingScenes.changes.subscribe(() => {
      this.paintingScenes.forEach(el => this.scrollObserver?.observe(el.nativeElement));
    });
  }

  ngOnDestroy(): void {
    this.scrollObserver?.disconnect();
  }

  private setupScrollObserver(): void {
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            const element = entry.target as HTMLElement;
            element.classList.remove('hide-paint');
            element.classList.add('is-visible');

            // disparition automatique après 5 secondes
            setTimeout(() => {
              element.classList.add('hide-paint');
            }, 5000);
          }
        });

      },
      {
        threshold:0.25,
        rootMargin:'0px 0px -100px 0px'
      }
    );


    this.paintingScenes.forEach(
      el => this.scrollObserver.observe(el.nativeElement)
    );
  }

  private loadData(): void {
    this.tableauxService.getTableaux().subscribe((tableaux: Tableau[]) => {
      this.dataSource = tableaux;
    });
  }

  toggleLike(tableau: Tableau): void {
    if (!this.utilisateurCourant) return;

    if (this.utilisateurCourant.tableauxLikes.includes(tableau.id)) {
      this.utilisateurCourant.tableauxLikes = this.utilisateurCourant.tableauxLikes
        .filter((id: number) => id !== tableau.id);

      this.utilisateursService.removeLike(tableau.id.toString()).subscribe({
        next: () => this.openSnackBar(tableau.nom, 'retiré des favoris'),
        error: (err) => console.error('Erreur retrait like', err),
      });
    } else {
      this.utilisateurCourant.tableauxLikes.push(tableau.id);

      this.utilisateursService.addLike(tableau.id.toString()).subscribe({
        next: () => this.openSnackBar(tableau.nom, 'ajouté aux favoris'),
        error: (err) => console.error('Erreur ajout like', err),
      });
    }
  }

  toggleCart(tableau: Tableau): void {
    if (!this.utilisateurCourant) return;

    if (this.utilisateurCourant.tableauxDansPanier.includes(tableau.id)) {
      this.utilisateurCourant.tableauxDansPanier = this.utilisateurCourant.tableauxDansPanier
        .filter((id: number) => id !== tableau.id);

      this.utilisateursService.removeFromCart(tableau.id.toString()).subscribe({
        next: () => this.openSnackBar(tableau.nom, 'retiré du panier'),
        error: (err) => console.error('Erreur retrait panier', err),
      });
    } else {
      this.utilisateurCourant.tableauxDansPanier.push(tableau.id);

      this.utilisateursService.addToCart(tableau.id.toString()).subscribe({
        next: () => this.openSnackBar(tableau.nom, 'ajouté au panier'),
        error: (err) => console.error('Erreur ajout panier', err),
      });
    }
  }

  private openSnackBar(nom: string, status: string): void {
    this.snackBar.open(`« ${nom} » ${status}`, 'Fermer', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}