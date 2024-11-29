import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

import { jwtDecode } from 'jwt-decode';

import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbarServcie: SnackbarService
  ) {}

  canActive(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;
    const token:any = localStorage.getItem('accessToken');
    var tokenPayoad: any;
    try{
      tokenPayoad = jwtDecode(token);
    }catch(err){
       localStorage.clear();
       this.router.navigate(['/'])
    }
    
    let checkRole = false;
    for( let i = 0; i < expectedRoleArray.legth; i++){
        if(expectedRoleArray[i] == tokenPayoad.role){
          checkRole = true;
        }
    }

    if(tokenPayoad.role == 'user' || tokenPayoad.role == 'admin'){
      if(this.authService.isAuthenticated() && checkRole){
        return true;
      }
      this.snackbarServcie.openSnackBar(GlobalConstant.unauthorized, GlobalConstant.error);
      this.router.navigate(['cafe/dashboard']);
      return false;
    }else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
