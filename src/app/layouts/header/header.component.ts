import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private authService: AuthService = inject(AuthService)

  isLogedIn$!:Observable<boolean>
  email?: string

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('user') as string).email
    
    this.isLogedIn$ = this.authService.isLogedIn()

  }

  onLogout() {
    this.authService.logOut()
    this.email = ''
  }

}
