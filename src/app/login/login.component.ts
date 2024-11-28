import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstant } from '../shared/global-constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  responseMessage!: string;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
      password: [null, [Validators.required]]
    })
  }

  handleSubmit(){
    this.ngxService.start();
    const formData = this.loginForm.value;

    const data = {
      email: formData.email, 
      password: formData.password
    };

    this.userService.login(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.responseMessage = res?.message || 'Loged in successfully.';
        this.dialogRef.close();
        this.snackbarService.openSnackBar(this.responseMessage, '');
        if (res?.accessToken) {
          localStorage.setItem('authToken', res.accessToken);
        }
        this.router.navigate(['/cafe/dashboard']);
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
