import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SeriesDataService } from '../series-data.service';
import { Series } from '../series-list/series-list.component';

@Component({
  selector: 'app-edit-series',
  templateUrl: './edit-series.component.html',
  styleUrls: ['./edit-series.component.css']
})
export class EditSeriesComponent implements OnInit {

@ViewChild('editSeriesForm')
editSeriesForm!:NgForm;
series!:Series;
  constructor(private seriesData:SeriesDataService,private router:Router) { }

  ngOnInit(): void {
    this.series=this.seriesData.seriesGetter();
 
  }

  edit(editSeriesForm:NgForm):void{
    console.log(editSeriesForm);
    console.log(this.series);
    this.seriesData.editSeries(this.series._id,this.series).subscribe({
      next:newSeries=>{
        console.log("Series Updated Sucessfully");
        
      },
      error:err=>{
        console.log("Service Error on edit Series",err);
      },
      complete:()=>{
        console.log("Complete EditSeries");
        console.log("Series Id: ",this.series._id);
        
        this.router.navigate(['series/'+this.series._id])

      }
    })
  }

}
