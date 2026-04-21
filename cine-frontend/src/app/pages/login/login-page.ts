import { Component, effect, inject, OnInit, signal } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";


@Component({
  templateUrl: './login-page.html',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
})

export class LoginPage {
  private router = inject(Router);
  userValue = signal<string>("");
  passwordValue = signal<string>("");
  loginSuccess = signal<boolean | null>(null);

  userIcon = faUser;
  lockIcon = faLock;

  constructor() {
    effect(() => {
      localStorage.setItem('loginSuccess', JSON.stringify(this.loginSuccess()));
    });
  }

  ngOnInit() {
    const savedLogin = localStorage.getItem('loginSuccess');

    if (savedLogin === 'true') {
      this.router.navigate(['/admin']);
    }
  }

  updateUsernameValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userValue.set(input.value);
  }

  updatePasswordValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.passwordValue.set(input.value);
  }

  async authAdmin() {
    if (!this.userValue() || !this.passwordValue()) {
      this.loginSuccess.set(false);
      return;
    }

    try {
      const response = await fetch(
        `api/adminlogin?user=${encodeURIComponent(this.userValue())}&pswrd=${encodeURIComponent(this.passwordValue())}`
      );

      if (!response.ok) {
        this.loginSuccess.set(false);
        return;
      }

      const data = await response.json();

      const isValid = data === true;

      this.loginSuccess.set(isValid);

      if (isValid) {
        localStorage.setItem('loginSuccess', 'true');
        this.router.navigateByUrl('/admin');
      }

    } catch (error) {
      console.error(error);
      this.loginSuccess.set(false);
    }
  }


  logout() {
    localStorage.removeItem('loginSuccess');
    this.router.navigateByUrl('/login');
  }

}