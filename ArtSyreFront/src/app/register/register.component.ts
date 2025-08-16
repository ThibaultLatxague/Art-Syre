// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UtilisateursService } from '../services/utilisateurs.service';
import { Utilisateur } from '../models/utilisateur.model';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
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
    this.setupPasswordStrengthCheck();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      nom: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s-']+$/) // Lettres, espaces, tirets et apostrophes
      ]],
      prenom: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s-']+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ], [this.emailExistsValidator.bind(this)]], // Validation asynchrone
      motDePasse: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmMotDePasse: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validation personnalisée pour la force du mot de passe
  passwordStrengthValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    
    return !isValid ? { passwordStrength: true } : null;
  }

  // Validation pour vérifier que les mots de passe correspondent
  passwordMatchValidator(form: AbstractControl): { [key: string]: any } | null {
    const password = form.get('motDePasse');
    const confirmPassword = form.get('confirmMotDePasse');

    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Supprimer l'erreur passwordMismatch si elle existe
      if (confirmPassword.errors) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    }
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

  // Configuration du contrôle de force du mot de passe
  setupPasswordStrengthCheck(): void {
    this.registerForm.get('motDePasse')?.valueChanges.subscribe(password => {
      this.passwordStrength = this.checkPasswordStrength(password);
    });
  }

  // Fonction pour évaluer la force du mot de passe
  checkPasswordStrength(password: string): any {
    if (!password) {
      return { class: '', text: '', color: '' };
    }

    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /[0-9]/.test(password),
      symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    score = Object.values(checks).filter(Boolean).length;

    switch (score) {
      case 0:
      case 1:
      case 2:
        return {
          class: 'weak',
          text: 'Faible',
          color: '#f44336'
        };
      case 3:
        return {
          class: 'medium',
          text: 'Moyen',
          color: '#ff9800'
        };
      case 4:
        return {
          class: 'good',
          text: 'Bon',
          color: '#2196f3'
        };
      case 5:
        return {
          class: 'strong',
          text: 'Fort',
          color: '#4caf50'
        };
      default:
        return {
          class: '',
          text: '',
          color: ''
        };
    }
  }

  // Soumission du formulaire
  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      this.isLoading = true;
      
      try {
        // Création de l'objet utilisateur pour Laravel
        const utilisateur: Utilisateur = {
          id: 0,
          nom: this.registerForm.value.nom.trim(),
          prenom: this.registerForm.value.prenom.trim(),
          email: this.registerForm.value.email.toLowerCase().trim(),
          password: this.registerForm.value.motDePasse,
          dateCreation: new Date().toISOString().slice(0, 19).replace('T', ' '),
          estAdministrateur: false
        };

        // Appel de la fonction createUtilisateur
        await this.utilisateurService.createUtilisateur(utilisateur).toPromise();

        // Simulation de l'appel API - remplacez par votre service
        await this.simulateApiCall(utilisateur);
        
        this.snackBar.open('Compte créé avec succès !', 'Fermer', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });

        // Redirection vers la page de connexion
        this.router.navigate(['/login']);
        
      } catch (error: any) {
        console.error('Erreur lors de l\'inscription:', error);
        
        let errorMessage = 'Une erreur est survenue lors de la création du compte.';
        
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

  // Simulation d'appel API - à supprimer quand vous utilisez votre service
  private simulateApiCall(utilisateur: Utilisateur): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('Données utilisateur à envoyer:', utilisateur);
      setTimeout(() => {
        // Simuler une réponse réussie
        resolve({ message: 'Utilisateur créé avec succès', id: 1 });
        // Pour simuler une erreur, décommentez la ligne ci-dessous :
        // reject({ error: { message: 'Email déjà utilisé' } });
      }, 2000);
    });
  }

  // Marquer tous les contrôles comme touchés
  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.registerForm.reset();
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
    const control = this.registerForm.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
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
      nom: 'Le nom',
      prenom: 'Le prénom',
      email: 'L\'adresse email',
      motDePasse: 'Le mot de passe',
      confirmMotDePasse: 'La confirmation du mot de passe'
    };
    return labels[controlName] || 'Le champ';
  }
}