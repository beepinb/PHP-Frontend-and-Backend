import { Component, OnInit } from '@angular/core';
import { SeriesDataService } from '../series-data.service';

export class Series{
  _id!:string;
  title!:string;
  year!:number;
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
  series!:Series[];
  searchTerm!: string;

  constructor(private seriesService:SeriesDataService) { }

  ngOnInit(): void {


    this.seriesService.getAllSeries().subscribe(
      {
        next:series=>{
          console.log("Found List of Series");
          this.series=series;
        },
        error:err=>{
          console.log("Service error",err);
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
