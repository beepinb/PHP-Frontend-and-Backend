import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { SeriesDataService } from '../series-data.service';
import { Series } from '../series-list/series-list.component';

@Component({
  selector: 'app-series-details',
  templateUrl: './series-details.component.html',
  styleUrls: ['./series-details.component.css'],
})
export class SeriesDetailsComponent implements OnInit {

  isLogin!:boolean;
  series!: Series;



  constructor(
    private seriesService: SeriesDataService,
    private route: ActivatedRoute,
    private router:Router,
    private authenticateService:AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getSeries();
    this.isLogin=this.authenticateService.isLoggedIn;
  }

  getSeries(): void {
    const seriesId = this.route.snapshot.params['seriesId'];

    this.seriesService.getSeries(seriesId).subscribe({
      next: (series) => {
        console.log('Inside Series-Details');
        this.series = series;
        console.log(series);
        
      },
      error: (err) => {
        console.log('Service Error', err);
      },
      complete: () => {
        console.log('Completed');
      }
    });
  }


  // editSeries(seriesData:Series):void{
  //   this.series=seriesData;
  // }




  deleteSeries():void{
    const seriesId = this.route.snapshot.params['seriesId'];
    this.seriesService.deleteSeries(seriesId).subscribe(
      {
        next:series=>{
          console.log("Series deleted Sucessfully of title: ",series.title);
        },
        error: (err) => {
          console.log('Service Error', err);
        },
        complete: () => {
          console.log('Completed');
          alert("Series deleted Sucessfully");
          this.router.navigate(["series"]);
        }
      }
    )
  }

  backToList():void{
    this.router.navigate(["series"]);
  }

  

  
  editSeries():void{
    this.seriesService.seriesSetter(this.series);
    this.router.navigate(['edit/'+this.series._id]);

    
  }

}