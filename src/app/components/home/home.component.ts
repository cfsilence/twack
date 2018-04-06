import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    if( localStorage.getItem('twackToken') ) {
      this.router.navigate(['/chat']);
    }
  }

  submitLogin() {
    localStorage.setItem('twackUsername', this.username);
    this.authService.authenticate(this.username)
      .subscribe( (result: any) => {
        localStorage.setItem('twackToken', result.token);
        this.router.navigate(['/chat']);
      });
  }
}
