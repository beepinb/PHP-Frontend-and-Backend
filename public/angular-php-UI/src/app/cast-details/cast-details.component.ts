import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { SeriesDataService } from '../series-data.service';
import { Cast, Series } from '../series-list/series-list.component';

@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.component.html',
  styleUrls: ['./cast-details.component.css']
})
export class CastDetailsComponent implements OnInit {


  @ViewChild('addCastForm')
  addCastForm!:NgForm;

  casts:Cast[]=[];
  flag:boolean=false;

  constructor(private seriesService: SeriesDataService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.showAllCast();
    console.log(this.casts);
    
  }
  editFlag():void{
    if(!this.flag){
      this.flag=true;
    }else{
      this.flag=false;
    }
  }

  showAllCast():void{
    const seriesId = this.route.snapshot.params['seriesId'];
    this.seriesService.getAllCast(seriesId).subscribe(
      {
        next:casts=>{
          this.casts=casts;
          console.log("Cast Found");
          console.log(casts);
           
        },
        error: (err) => {
          console.log('Service Error', err);
        },
        complete: () => {
          console.log('Completed');
          // this.router.navigate(["series"]);
        }
      }
    )
  }

  viewDetail():void{
    console.log("Inside view Detail of one cast");
    
  }

  addCast(addCastForm:NgForm):void{
    // this.flag=true;
    console.log("Inside Add Cast");
    const seriesId = this.route.snapshot.params['seriesId'];
    const formData={
      name:this.addCastForm.value.name,
      age:this.addCastForm.value.age
    }
    this.seriesService.addOneCast(seriesId,formData).subscribe({
      next:cast=>{
        console.log("Cast Added",cast);
      },
      error:err=>{
        console.log("Error",err);
      },
      complete:()=>{
        console.log("Complete");
        this.flag=false;
        this.showAllCast();
      }
    })    
  }

  deleteCast(castId:string):void{
    const seriesId = this.route.snapshot.params['seriesId'];
    console.log("Cast Id:",castId);
    
    this.seriesService.deleteCast(seriesId,castId).subscribe(
      {
        next:series=>{
          console.log("Cast deleted Sucessfully");
      },
        error: (err) => {
          console.log('Service Error', err);
        },
        complete: () => {
          console.log('Completed');
          alert("Cast deleted Sucessfully");
          this.showAllCast();
        }
      }
    )
  }


  
}
