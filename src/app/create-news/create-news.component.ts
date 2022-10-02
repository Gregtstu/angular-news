import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {INews} from "../service.service";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  public createNewForm !: FormGroup;
  constructor( private formBuider: FormBuilder, private authService: AuthService, ) { }

  ngOnInit(): void {
    this.createNewForm =  this.formBuider.group({
      title : ['', [Validators.required]],
      country : ['', [Validators.required]],
      link : ['', [Validators.required]]
    });
  }


  createNews() {
    this.authService.createNews(this.createNewForm.value)
      .subscribe(res => {
        alert('SignUp Sucsessful');
        console.log(res)
        this.createNewForm.reset();
      });
  }

}

