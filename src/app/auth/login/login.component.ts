import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  private authService: AuthService = inject(AuthService)

  ngOnInit(): void {
  }

  onSubmit(value: { email: string, password: string }) {
    console.log(value);
    this.authService.login(value.email, value.password)
  }
  

}
