import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  _url="http://localhost:4000/";
  employees: Employee[];
  constructor(private _http: HttpClient) { }

  postData(employeeData){
    return this._http.post<any>(this._url+"addData/",employeeData).pipe();
  }

  getAllEmployees(){
    return this._http.get<any>(this._url+"getAll/");
  }

  updateEmployee(employeeData){
    console.log(employeeData);
    return this._http.put<any>(this._url+`${employeeData._id}`,employeeData).pipe();
  }

  deleteEmployee(_id:string){
    console.log(this._url+`${_id}`);
    return this._http.delete(this._url+`${_id}`);
  }
}
