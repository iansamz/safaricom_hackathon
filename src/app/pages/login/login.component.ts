import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  loginGoogle(){
    this.authService.loginGoogle();
  }

}
