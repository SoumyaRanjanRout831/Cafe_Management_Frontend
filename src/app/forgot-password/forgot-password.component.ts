import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstant } from '../shared/global-constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  responseMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
    });
  }

  handleSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.snackbarService.openSnackBar('Please enter a valid email', GlobalConstant.error);
      return;
    }

    this.ngxService.start();
    const formData = this.forgotPasswordForm.value;

    const data = {
      email: formData.email, 
    };

    this.userService.forgotPassword(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.responseMessage = res?.message || 'Password reset email sent successfully.';
        this.dialogRef.close();
        this.snackbarService.openSnackBar(this.responseMessage, '');
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage =
          error.error?.message || GlobalConstant.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstant.error);
      }
    );
  }
}
