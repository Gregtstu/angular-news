import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder,  FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService, IAuth} from "../service/auth.service";
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // emailFormControl = new FormControl('', [Validators.required]);
  public  hide: boolean;
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
     private http: HttpClient,  
     private router: Router, 
     private authService: AuthService,
     private toast: NgToastService
     ){
    this.hide = true;
  }




  ngOnInit(): void {
    this.toast.warning({detail:"ВНИМАНИЕ",summary:'Пожалуйста, введите свои данные',duration:5000});
    this.loginForm =  this.formBuilder.group({
      email : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
  }

  login() {
    this.authService.auth(this.loginForm.value)
      .subscribe(res => {
        if(res.token){
          this.toast.success({detail:"ПОЗДРАВЛЯЕМ",summary:'Вы успешно прошли авторизацию',duration:5000});
          this.loginForm.reset();
          this.router.navigate(['loyaut/news']);
        }
        
      },err => {
        this.toast.error({detail:"ОШИБКА",summary:'Проверте логин и пароль',sticky:true});
      }
      );
  }

  // showSuccess() {
  //   this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:5000});
  // }
  
  // showError() {
  //   this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:true});
  // }

  // showInfo() {
  //   this.toast.info({detail:"INFO",summary:'Your Info Message',sticky:true});
  // }

  // showWarn() {
  //   this.toast.warning({detail:"WARN",summary:'Your Warn Message',duration:5000});
  // }
}
