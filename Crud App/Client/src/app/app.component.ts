import { Component, OnInit } from '@angular/core';
import {Employee} from "./employee";
import { FormBuilder, Validator, Validators, Form, NgForm } from '@angular/forms';
import {forbiddenName} from "./shared/validator"
import {EmployeeService} from "./employee-service.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employeeList: Employee[];
  ngOnInit(){
    this.getEmployeeList()
  }

  constructor(private fb:FormBuilder, private _empService:EmployeeService){
  }
  private id:string;
  
  get getPosition(){
    return this.employeeForm.get("position");
  }
  employeeForm=this.fb.group({
    _id:[],
    name:["",[Validators.required,Validators.minLength(5), forbiddenName]],
    position:["",Validators.required],
    location:[],
    salary:[],
    address:this.fb.group({
      city:[],
      state:[],
      postalcode:[]
    })
  });
  // employeeForm=new FormGroup({
  //   name: new FormControl(""),
  //   position: new FormControl(""),
  //   location: new FormControl(""),
  //   salary: new FormControl(),
  //   address: new FormGroup({
  //     city: new FormControl(""),
  //     state: new FormControl(""),
  //     postalcode: new FormControl("")
  //   })
  // });
  
  loadData(){
    //setvalue maintains the structure of formgroup stictly
    //can use pathvalue method to supply a part of formgroup objects
    this.employeeForm.setValue({
      _id:"0",
      name: "Venkat",
      position: "Developer",
      location: "Coimbatore",
      salary: 50000,
      address: {
        city: "CBE",
        state: "TN",
        postalcode: 641008
    }
  });
  }

  onEdit(emp:Employee){
    this.employeeForm.patchValue(emp);
      }

  onSubmit(){
    console.log(this.employeeForm.value);
    if(this.employeeForm.value._id=="0"){
      console.log("Insert");
      this._empService.postData(this.employeeForm.value).subscribe(
        res=>{
          console.log(res);           
        })
        this.getEmployeeList();
        window.location.reload();
    }
    else{
      console.log("Update");
      this._empService.updateEmployee(this.employeeForm.value).subscribe(
        res=>{
          console.log(res.json);
          console.log("Success");
                     
        });
        window.location.reload();
    }
    
    
  }

  getEmployeeList(){
    this._empService.getAllEmployees().subscribe(
      res=>{
        this.employeeList=res as Employee[];
        console.log(this.employeeList);
      }
    )
  }
  deleteEmployee(id:string){
    if(confirm("Are you sure to delete?")){
      this._empService.deleteEmployee(id).subscribe(
        res=>{
          console.log(res);     
        })
        window.location.reload();
    }
  }
}
