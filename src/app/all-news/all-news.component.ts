import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {INews, ServiceService} from "../service.service";
import {AuthService} from "../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";


@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent  implements   AfterViewInit {
 public ELEMENT_DATA: INews[];
 public dataSource: MatTableDataSource<INews>;
 public links:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public displayedColumns: string[];

  constructor(private service: ServiceService,
              private authService: AuthService,
              public dialog: MatDialog
              ){
    this.links = '';
    this.ELEMENT_DATA =[];
    this.displayedColumns = ['country', 'title', 'link', 'favorite'];
    this.dataSource = new MatTableDataSource<INews>(this.ELEMENT_DATA);
  }
  openDialog(element:INews) {
    this.dialog.open(ModalComponent, {
      width:'600px',
      height:'300px',
      data: element
    });

  }

  // ngOnInit() {
  // }

  getAll():void{
    this.service.onGetAll().subscribe(report=> {
      this.dataSource.data=report as INews[];
      this.dataSource.data.forEach(item => {
      this.links = item.link
      })
    });
  }

  onFavorite(elem:any):void{
    const obj =  {
      email: 'test11',
      newsId: `${elem.id}`,
      userId: 66
    }
    this.authService.favoriteNewws(obj).subscribe(res => {
      alert('добаавленаа в избранное');
    });
    const myContainer = document.querySelector('.neactiveclass') as HTMLInputElement;
    myContainer.classList.add('activeclass');
  }

  ngAfterViewInit() {
    this.getAll();
    this.dataSource.paginator = this.paginator;
  }

}

