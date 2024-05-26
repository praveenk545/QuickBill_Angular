import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
 constructor(private router:Router, private http:HttpClient){

 }
 ngOnInit(): void {
   
 }
 formValues:string[]|any=[];;
 apiUrl="http://localhost:3000/register";
  isTrySubmit:boolean=false;
 Form=new FormGroup({
  name:new FormControl('',[Validators.required]),
  itemName:new FormControl('',[Validators.required]),
  unitPrice:new FormControl('',[Validators.required]),
  quantity:new FormControl('',[Validators.required]),
  amount:new FormControl(),
  date:new FormControl('',[Validators.required]),
  
  })

  submit(){
    this.isTrySubmit=true;
    if(this.Form.valid){
      this.formValues.push(this.Form.value)
     let myamount=this.formValues.unitPrice*this.formValues.quantity;
     // this.Form.get(['amount'])?.patchValue(myamount)
      console.log(this.formValues)
     
      const url=`${this.apiUrl}`     
      this.http.post(url,this.Form.value).subscribe((res:any)=>{
        if(res.statusCode==200){
        
         this.router.navigate(['/home'])
         alert("success")
          // window.location.reload()
        }else{
          alert("error accured")
        }
      },error=>{
        throw new error;
      })
}
  }
  cancel(){

  }

  home(){
    this.router.navigate(['home'])
  }
}
