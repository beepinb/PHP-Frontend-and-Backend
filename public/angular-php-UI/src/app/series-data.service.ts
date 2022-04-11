import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cast, Series } from './series-list/series-list.component';

@Injectable({
  providedIn: 'root'
})
export class SeriesDataService {
  series!:Series;
  

  private baseUrl:string=environment.REST_API_BASE;         //"http://localhost:5656/api/";

  constructor(private http:HttpClient) { }

  public getAllSeries():Observable<Series[]>{
    console.log("Inside getSeries Servicedata");
    const url:string=this.baseUrl+"tvseries";
    return this.http.get<Series[]>(url);
  }
  public getSeries(seriesId:string):Observable<Series>{
    const url:string=this.baseUrl+"tvseries/"+seriesId;
    return this.http.get<Series>(url);
  }

  public addSeries(seriesData:any):Observable<Series>{
    const url:string=this.baseUrl+"tvseries";
    console.log("Inside Service AddSeries",seriesData);
    return this.http.post<Series>(url,seriesData);
  }

  public editSeries(seriesId:string,seriesData:any):Observable<Series>{
    const url:string=this.baseUrl+"tvseries/"+seriesId;
    console.log("Inside Service editSeries",seriesData);
    return this.http.put<Series>(url,seriesData);
  }

  public deleteSeries(seriesId:string):Observable<Series>{
    const url:string=this.baseUrl+"tvseries/"+seriesId;
    return this.http.delete<Series>(url);
  }

  public getAllCast(seriesId:string):Observable<Cast[]>{
    const url:string=this.baseUrl+"tvseries/"+seriesId+"/cast";
    return this.http.get<Cast[]>(url);
  }

  public getOneCast(seriesId:string,actorId:string):Observable<Cast>{
    const url:string=this.baseUrl+"tvseries/"+seriesId+"/cast/"+actorId;
    return this.http.get<Cast>(url);
  }
  public addOneCast(seriesId:string,castData:any):Observable<Cast>{
    const url:string=this.baseUrl+"tvseries/"+seriesId+"/cast";
    return this.http.post<Cast>(url,castData);
  }
  public editOneCast(seriesId:string,actorId:string,castData:Cast):Observable<Cast>{
    const url:string=this.baseUrl+"tvseries/"+seriesId+"/cast/"+actorId;
    return this.http.put<Cast>(url,castData);
  }
  public deleteCast(seriesId:string,actorId:string):Observable<Cast>{
    const url:string=this.baseUrl+"tvseries/"+seriesId+"/cast/"+actorId;
    return this.http.delete<Cast>(url);
  }

  seriesSetter(series: Series) {
    this.series=series;
  }
  seriesGetter():Series{
    return this.series;
  }
}
