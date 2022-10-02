import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {INews} from "../service.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public createNewForm !: FormGroup;

  constructor(private formBuider: FormBuilder,
              private authService: AuthService,
              public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data:INews,
              ) {
  }

  ngOnInit(): void {
    this.createNewForm = this.formBuider.group({
      title: [this.data.title, [Validators.required]],
      country: [this.data.country, [Validators.required]],
      link: [this.data.link, [Validators.required]]
    });
  }



  editNews() {
    this.authService.editNews(this.data.id, this.createNewForm.value)
      .subscribe(res => {
        alert('SignUp Sucsessful');
        console.log(res)
        this.createNewForm.reset();
      });
  }

}
