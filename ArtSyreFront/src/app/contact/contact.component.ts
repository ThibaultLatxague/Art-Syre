import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent  implements OnInit {

  contactForm: FormGroup;
  isSubmitting: boolean = false;
  submitMessage: string = '';
  submitMessageType: 'success' | 'error' = 'success';

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.createForm();
  }

  ngOnInit(): void {
    // Initialisation du composant
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      subject: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';

      // Simulation d'un appel API
      const formData = {
        email: this.contactForm.get('email')?.value,
        subject: this.contactForm.get('subject')?.value,
        description: this.contactForm.get('description')?.value,
        timestamp: new Date().toISOString()
      };

      // Simuler un délai de traitement
      setTimeout(() => {
        try {
          // Ici, vous appelleriez votre service pour envoyer les données
          console.log('Données du formulaire:', formData);
          
          // Simulation d'un succès
          this.handleSubmitSuccess();
          
        } catch (error) {
          this.handleSubmitError();
        }
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private handleSubmitSuccess(): void {
  }

  private handleSubmitError(): void {
  }

  onReset(): void {
    this.contactForm.reset();
    this.submitMessage = '';
    
    // Réinitialiser les états de validation
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.setErrors(null);
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  // Méthodes utilitaires pour les templates
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.hasError(errorType) && field.touched : false;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (!field || !field.errors) {
      return '';
    }

    const errors = field.errors;

    switch (fieldName) {
      case 'email':
        if (errors['required']) return 'L\'adresse email est obligatoire';
        if (errors['email']) return 'Veuillez saisir une adresse email valide';
        break;
        
      case 'subject':
        if (errors['required']) return 'Veuillez sélectionner un sujet';
        break;
        
      case 'description':
        if (errors['required']) return 'La description est obligatoire';
        if (errors['minlength']) return `La description doit contenir au moins ${errors['minlength'].requiredLength} caractères`;
        if (errors['maxlength']) return `La description ne peut pas dépasser ${errors['maxlength'].requiredLength} caractères`;
        break;
    }

    return 'Champ invalide';
  }

  // Getter pour faciliter l'accès aux contrôles du formulaire
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get description() { return this.contactForm.get('description'); }
}