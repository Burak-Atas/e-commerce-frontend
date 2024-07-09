import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { User } from "../models/user";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // LocalStorage'dan kullanıcı bilgilerini alın
    const userData = localStorage.getItem("user");
    console.log('Stored user data:', userData);
    
    if (userData) {
      // Kullanıcı bilgilerini JSON olarak ayrıştırın
      const user: User = JSON.parse(userData);
      console.log('Parsed user data:', user);
      
      // Kullanıcının email adresini kontrol edin
      if (user.email === 'eyuphan@gmail.com') {
        return true;
      }
    }

    // Kullanıcı bilgileri geçerli değilse veya email eşleşmiyorsa, auth sayfasına yönlendirin
    this.router.navigate(['/auth']);
    return false;
  }
}




