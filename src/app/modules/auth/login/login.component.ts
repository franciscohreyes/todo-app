import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// Material
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
//
import { AuthService } from '@modules/auth/services/auth.service';
import { ConfirmDialogComponent } from '@modules/auth/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  email:string = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  /**
   * login
   */
  login() {
    if (this.loginForm.valid) {
      this.authService.checkUserExists(this.email).subscribe((res:any) => {
        console.log(res.exists);
        if(res.exists) {
          this.router.navigate(['/home']);
          localStorage.setItem('auth_token', this.email);
        } else {
          this.openConfirmationDialog();
        }
      });
    }

  }

  /**
   * openConfirmationDialog
   */
  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmación de usuario',
        message: '¿Te gustaría crear una cuenta con este correo?',
        confirmText: 'Sí, crear mi cuenta ahora',
        cancelText: 'No',
        email: this.email
      },
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.authService.register(this.email).subscribe({
          next: (response) => {
            localStorage.setItem('auth_token', response.email);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error en el login:', error);
          }
        });
      }
    });
  }

  /**
   * hasError
   * @param controlName
   * @param errorCode
   * @returns
   */
  hasError(controlName: string, errorCode: string): boolean {
    const control = this.loginForm.get(controlName);

    return control ? control.hasError(errorCode) : false;
  }

}
