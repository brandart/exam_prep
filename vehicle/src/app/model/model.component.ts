import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable }  from 'rxjs';
import {MatTableModule} from '@angular/material/table';

interface IModel 
{
  "id": string,
  "year": number,
  "make": string,
  "model": string,
  "hasDetails": number
}

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  public selectedYear: number = 0;
  public offset: number = 0;
  public selectedMake: string = "0";
  public makes: Observable<string[]>;
  public filteredModels: Observable<IModel[]>;
  public api: HttpClient;
  public years: Observable<number[]>;


  constructor(private http: HttpClient) {
    this.api = http;
    this.filteredModels = this.api.get<IModel[]>('https://vehicle-data.azurewebsites.net/api/models?&offset=' + this.offset);
    this.makes = this.api.get<string[]>('https://vehicle-data.azurewebsites.net/api/makes');
    this.years = this.api.get<number[]>('https://vehicle-data.azurewebsites.net/api/years');
  }

  ngOnInit() {
  }

  year(c){
    this.selectedYear = c;
    this.refresh()

  }

  make(c){
    this.selectedMake = c;
    this.refresh()
  }

  refresh(){
    let req: string = "";
    if(this.selectedMake !== "0"){
      req += "make=" + this.selectedMake
    }
    if(this.selectedYear != 0){
      req += "&year=" + this.selectedYear;
    }
    this.filteredModels = this.api.get<IModel[]>('https://vehicle-data.azurewebsites.net/api/models?'+ req +'&offset=' + this.offset);
  }
  isInvalid(){
    return this.offset == 0;
  }

  offsetAdd(c){
    this.offset += c;
    this.refresh();
  }

}
