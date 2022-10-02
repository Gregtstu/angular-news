import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import { ErrorStateMatcher } from '@angular/material/core';
import { NgToastService } from 'ng-angular-popup';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public  hide: boolean;
  public signUpForm !: FormGroup;
  constructor(
    private formBuider: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {
    this.hide = true;
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    this.toast.info({detail:"РЕКОМЕНДУЕМ",summary:'заполнить все поля формы',sticky:true});
    this.signUpForm =  this.formBuider.group({
      name : ['', [Validators.required]],
      secondName : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]]

    });
  }

  signUp() {
    if(this.signUpForm.invalid){
      this.toast.error({detail:"ОШИБКА",summary:'Внимательно проверте поля формы',sticky:true});
      return;
    }
    this.authService.registration(this.signUpForm.value)
    .subscribe(res => {
        this.signUpForm.reset();
        this.router.navigate(['login']);
      }, err => {
        this.toast.error({detail:"ОШИБКА",summary:'такой пользователь уже существует',sticky:true});
      }
      );
  }
}
