import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthenticationService } from "../../auth/authentication.service";
import { User } from "../../models/user";

@Component({
  selector: 'app-login-nube',
  templateUrl: './login-nube.page.html',
  styleUrls: ['./login-nube.page.scss'],
})
export class LoginComponent implements OnInit {

  /**
   * Loading
   */
  loading: boolean;

  /**
   * Submitted
   */
  submitted: boolean;

  /**
   * Return url to route
   */
  returnUrl: string;

  /**
   * Errors
   */
  error: string;

  /**
   * loginUser
   */
  loginUser = {
    email: 'mpenate@power-electronics.com',
    password: '12345678'
  };
  items = [];
  /**
   * User Logged
   */
  email: string;
  name: string;

  /**
   * Constructor
   * @param formBuilder Form Builder
   * @param route Route
   * @param router Router
   * @param authenticationService Service for authenticate user
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService 
  ) { }

  /**
   * Reset login status
   * Get return url from route parameters or default to '/'
   */
  ngOnInit() {
    this.submitted = false;
    this.loading = false;
    this.error = '';

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  async login (flogin: NgForm) {
    if (flogin.invalid ) {return;}
    const valid = await this.authenticationService.login(this.loginUser.email, this.loginUser.password);
    console.log(valid)
    this.email = valid['user']['email'];
    this.name = valid['user']['name'];
  }

  async test(){
    const valid = await this.authenticationService.test();
    this.items = valid;
  }
  /**
   * Function to log user when the form is valid
   */
  // onSubmit(flogin: NgForm) {
  //   this.submitted = true;

  //   this.loading = true;
  //   this.authenticationService.login(this..value)
  //     .pipe(first())
  //     .subscribe(
  //       () => {
  //         this.router.navigate([this.returnUrl]).then(response => {
  //           this.loading = false;

  //           if (!response) {
  //             this.error = 'The user does not have enough permissions';
  //             this.authenticationService.logout();
  //           }
  //         });
  //       },
  //       error => {
  //         if (error) {
  //           this.error = 'Email or password incorrect';
  //         } else {
  //           this.error = 'Unknown error';
  //         }
  //         this.loading = false;
  //       });
  // }

}

