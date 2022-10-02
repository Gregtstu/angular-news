import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {INews, ServiceService} from "../service.service";
import {AuthService} from "../service/auth.service";


@Component({
  selector: 'app-favorite-news',
  templateUrl: './favorite-news.component.html',
  styleUrls: ['./favorite-news.component.css']
})
export class FavoriteNewsComponent implements AfterViewInit {
  public ELEMENT_DATA: INews[];
  public dataSource: MatTableDataSource<INews>;
  public flag:boolean;
  public links:string;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public displayedColumns: string[]
  constructor(private service: ServiceService, private authService: AuthService){
    this.links = '';
    this.flag =false;
    this.ELEMENT_DATA =[];
    this.displayedColumns = ['country', 'title', 'link', 'favorite'];
    this.dataSource = new MatTableDataSource<INews>(this.ELEMENT_DATA);
  }

  // ngOnInit() {
  // }

  getAll():void{
    this.authService.getFavoriteNewws()
      .subscribe(report=> {
        this.dataSource.data =report.news as INews[];
    });
  }

  onFavorite(elem:any):void{
    elem.favorite = true;
    console.log(elem.id)
    const obj =  {
      email: 'test11',
      newsId: `${elem.id}`,
      userId: 66
    }
    this.authService.favoriteNewws(obj).subscribe(res => {
      alert('добаавлена в избранное');
    })
  }

  ngAfterViewInit() {
    this.getAll();
    this.dataSource.paginator = this.paginator;
  }

  deletePost(id:any) {
    console.log(id);
    this.authService.deleteFavoriteNewws(id)
      .subscribe(res => {
        alert('новость удалена')
        this.getAll();
      })
  }

}


