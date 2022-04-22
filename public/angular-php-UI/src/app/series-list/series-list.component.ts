import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { SeriesDataService } from '../series-data.service';

export class Series{
  _id!:string;
  title!:string;
  year!:Date;
  cast!:[{name:"",age:"",_id:""}];

}
export class Cast{
  _id!:string;
  name!:string;
  age!:number;
}

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  get isLoggedIn(){return this._authService.isLoggedIn}

  series!:Series[];
  searchTerm!: string;

  constructor(private seriesService:SeriesDataService,private _authService:AuthenticationService) { }

  ngOnInit(): void {


    this.seriesService.getAllSeries().subscribe(
      {
        next:series=>{
          console.log("Found List of Series");
          this.series=series;
        },
        error:err=>{
          console.log("Service errorr",err);
        },
        complete:()=>{
          console.log("Complete");
          
        }
      }
    )

  }

  getSeries():void{

  }

}
