import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logdIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isLoginGurd:boolean = false

  private router: Router = inject(Router)
  private fireAuth: AngularFireAuth = inject(AngularFireAuth)
  private toastr: ToastrService = inject(ToastrService)

  login(email: string, pass: string) {
    this.fireAuth.signInWithEmailAndPassword(email, pass)
      .then(logRef => {
        console.log(logRef);
        this.toastr.success('succec login')
        this.loadUser()
        this.logdIn.next(true)
        this.isLoginGurd = true
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err);
        this.toastr.warning(err)
      })
  }

  private loadUser() {
    this.fireAuth.authState.subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user))
    })
  }

  logOut() {
    this.fireAuth.signOut()
      .then(() => {
        this.toastr.info('succec logout')
        localStorage.removeItem('user')
        this.logdIn.next(false)
        this.isLoginGurd = false
        this.router.navigate(['/login'])
      })
  }

  isLogedIn () {
    return this.logdIn.asObservable()
  }

}
