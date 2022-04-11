import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SeriesDataService } from '../series-data.service';

@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html',
  styleUrls: ['./add-series.component.css']
})
export class AddSeriesComponent implements OnInit {

  @ViewChild('registrationForm')
  registrationForm!:NgForm;

  constructor(private seriesData:SeriesDataService,private router:Router) { }

  ngOnInit(): void {
  }

 


  register(registrationForm:NgForm):void{
    console.log(registrationForm.value);
    const formData={
      title:this.registrationForm.value.title,
      year:this.registrationForm.value.year,
      cast:{
        name:this.registrationForm.value.name,
        age:this.registrationForm.value.age
      }
    }
    this.seriesData.addSeries(formData).subscribe({
      next:series=>{
        console.log("Series Added",series);
      },
      error:err=>{
        console.log("Error",err);
      },
      complete:()=>{
        console.log("Complete");
        alert("Series Added Sucessfully");
        this.router.navigate(['series']);
      }
    })

  }

}
