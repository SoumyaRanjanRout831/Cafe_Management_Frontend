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
  forgotPasswordForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]]
    })
  }

  handleSubmit(){
    this.ngxService.start();
    let formData = this.forgotPasswordForm.value;
    let data = {
      // email: formData.email
      email: "soumyaranjanrout831@gmail.com"
    } 

    this.userService.forgotPassword(data).subscribe((res: any) => {
      this.ngxService.stop();
      this.responseMessage = res?.message
      this.dialogRef.close();
      this.snackbarService.openSnackBar(this.responseMessage, "");
    }), (error: any) =>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else {
        this.responseMessage = GlobalConstant.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstant.error);
    }
  }
}
