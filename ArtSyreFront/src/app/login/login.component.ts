import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilisateursService } from '../services/utilisateurs.service';
import { Utilisateur } from '../models/utilisateur.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  passwordStrength: any = { class: '', text: '', color: '' };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private utilisateurService: UtilisateursService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ], [this.emailExistsValidator.bind(this)]], // Validation asynchrone
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
    }, {  });
  }

  // Validation asynchrone pour vérifier l'unicité de l'email
  async emailExistsValidator(control: AbstractControl): Promise<{ [key: string]: any } | null> {
    if (!control.value) return null;

    try {
      // Remplacez par votre logique de vérification d'email existant
      // const exists = await this.utilisateurService.checkEmailExists(control.value).toPromise();
      // return exists ? { emailExists: true } : null;
      
      // Pour l'instant, simulation - remplacez par votre API
      return new Promise(resolve => {
        setTimeout(() => {
          // Simuler la vérification - vous devez implémenter cette logique
          const emailExists = false; // Remplacez par votre vérification réelle
          resolve(emailExists ? { emailExists: true } : null);
        }, 500);
      });
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'email:', error);
      return null;
    }
  }

  // Soumission du formulaire
  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      try {
        // Création de l'objet utilisateur pour Laravel
        const utilisateur: Utilisateur = {
          id: 0,
          nom: '',
          prenom: '',
          email: this.loginForm.value.email.toLowerCase().trim(),
          password: this.loginForm.value.password,
          dateCreation: new Date().toISOString().slice(0, 19).replace('T', ' '),
          estAdministrateur: false
        };

        // Appel de la fonction connectUtilisateur
        await this.utilisateurService.connectUtilisateur(utilisateur.email, utilisateur.password).toPromise();

        // Redirection vers la page d'accueil (vide)
        this.router.navigate(['']);

      } catch (error: any) {
        console.error('Erreur lors de la connexion:', error);

        let errorMessage = 'Une erreur est survenue lors de la connexion.';

        // Gestion des erreurs Laravel
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.error?.errors) {
          // Erreurs de validation Laravel
          const validationErrors = Object.values(error.error.errors).flat();
          errorMessage = validationErrors.join(', ');
        } else if (error.message) {
          errorMessage = error.message;
        }

        this.snackBar.open(errorMessage, 'Fermer', {
          duration: 7000,
          panelClass: ['error-snackbar']
        });
      } finally {
        this.isLoading = false;
      }
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.markFormGroupTouched();
      
      this.snackBar.open('Veuillez corriger les erreurs dans le formulaire.', 'Fermer', {
        duration: 5000,
        panelClass: ['warning-snackbar']
      });
    }
  }

  // Marquer tous les contrôles comme touchés
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.loginForm.reset();
    this.passwordStrength = { class: '', text: '', color: '' };
    
    // Remettre les valeurs par défaut
    this.hidePassword = true;
    this.hideConfirmPassword = true;
    
    this.snackBar.open('Formulaire réinitialisé', 'Fermer', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }

  // Méthodes utilitaires pour les templates
  hasError(controlName: string, errorType: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors) return '';

    const errors = control.errors;
    
    if (errors['required']) return `${this.getFieldLabel(controlName)} est obligatoire`;
    if (errors['minlength']) return `${this.getFieldLabel(controlName)} doit contenir au moins ${errors['minlength'].requiredLength} caractères`;
    if (errors['email']) return 'Veuillez saisir une adresse email valide';
    if (errors['pattern']) return `${this.getFieldLabel(controlName)} contient des caractères non autorisés`;
    if (errors['passwordStrength']) return 'Le mot de passe ne respecte pas les critères de sécurité';
    if (errors['passwordMismatch']) return 'Les mots de passe ne correspondent pas';
    if (errors['emailExists']) return 'Cette adresse email est déjà utilisée';
    
    return 'Erreur de validation';
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      email: 'L\'adresse email',
      motDePasse: 'Le mot de passe',
    };
    return labels[controlName] || 'Le champ';
  }
}