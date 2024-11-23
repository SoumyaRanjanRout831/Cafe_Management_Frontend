import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: any = FormGroup;
  responseMessage: any ;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstant.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstant.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstant.contactNumberRegex)]],
      password: [null, [Validators.required]]
    })
  }

  handleSubmit(){
    this.ngxService.start();
    let formData = this.signupForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }
    this.user.signUp(data).subscribe((res: any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = res.message;
      this.snackbarService.openSnackBar(this.responseMessage, '');
      this.router.navigate(['/']);

    }, (err) =>{
      this.ngxService.stop();

 if(err.error?.message){
  this.responseMessage = err.error?.message;

 }else {
  this.responseMessage = GlobalConstant.genericError;
 }
 this.snackbarService.openSnackBar(this.responseMessage, GlobalConstant.error)
      
    })
  }
}
