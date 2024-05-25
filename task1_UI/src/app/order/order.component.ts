import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { get } from 'http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  
})
export class OrderComponent implements OnInit {
amount: any;
getTotal:any;
totalAmount:[]|any;
public orderValues:string[] | any;

currentIndex:any;
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.getData()
    this.total()
  }

  apiUrl="http://localhost:3000/register";
  // const url=`${this.apiUrl}/${id}`;
  isTrySubmit:boolean=false;
  isTrySubmitforLogin:boolean=false;
  isChange:boolean=false;
  formValues:string[]|any=[];;
  loginValues:any|[];
 
Form=new FormGroup({
name:new FormControl('',[Validators.required]),
itemName:new FormControl('',[Validators.required]),
unitPrice:new FormControl('',[Validators.required]),
quantity:new FormControl('',[Validators.required]),
amount:new FormControl()

})
  

 
submit(){
  this.isTrySubmit=true;
    if(this.Form.valid){
      this.formValues.push(this.Form.value)
     let myamount=this.formValues.unitPrice*this.formValues.quantity;
      this.Form.get(['amount'])?.patchValue(myamount)
      console.log(this.formValues)
      // this.sendData=this.formValue
      //console.log("formvalues",this.addValues)
      // this.isTrySubmit=false;
      // this.amount=this.Form.controls.unitPrice*this.formValues.quantity;
   
      const url=`${this.apiUrl}`     
      this.http.post(url,this.Form.value).subscribe((res:any)=>{
        if(res.statusCode==200){
         alert("success")
          this.Form.reset();
        }else{
          alert("error accured")
        }
      },error=>{
        throw new error;
      })
}
}
getData=()=>{
  return this.http.get('http://localhost:3000/register').subscribe((res:any)=>{
    if(res.data.length>0){
      // console.log(res.data)
      //this.getValues=new Array(res)
      this.orderValues=(res.data)
      // this.amount=parseInt(this.orderValues.unitPrice)*parseInt(this.orderValues.quantity);
      let Total=this.orderValues.reduce((acc:any,curr:any)=>{
         if(!acc[curr]){
          acc.push(curr.quantity*curr.unitPrice)
    
         }
         return acc;
        
        
      },[])
      console.log(Total,"Values")
      let total: number = 0;

for (let i = 0; i < Total.length; i++) {
    total += Total[i];
  this.getTotal=total;
  console.log(this.getTotal)
}

 
    }
 
  })
}
edit(v:any,id:number){
  this.Form.get(['name'])?.patchValue(v.name)
  this.Form.get(['itemName'])?.patchValue(v.itemName)
  this.Form.get(['unitPrice'])?.patchValue(v.unitPrice)
  this.Form.get(['quantity'])?.patchValue(v.quantity)
  console.log(v.name)
  this.currentIndex=id
  this.Form.updateValueAndValidity()
  if(!this.isChange){
    this.isChange=true;
  }
  // this.Form.get(['name'])?.patchValue(v.name)
  

}
updateSave(id:number){
  id=this.currentIndex
  console.log(id)
 
  const url=`${this.apiUrl}/${id}`;
  return this.http.patch(url,this.Form.value).subscribe((res:any)=>{
    if(res.statusCode==200){
      res.data.id=id
      alert("successfull")
      if(this.isChange){
        this.isChange=false;
        this.Form.reset()
        this.isTrySubmit=false;
       }
    }
    else if(res.statusCode==400 || res.statusCode==500){
      console.log(res.message)
    }  
  },error=>{
    throw new error;
  })
}
delete(id:number){
  return this.http.delete('http://localhost:3000/register/'+`${id}`).subscribe((res:any)=>{
    if(res.statusCode==200){
    
      console.log(id,"delete")

    }
    else{
    if(res.statusCode==400||res.statusCode==500){
      console.log(res.message)
    }
    }
  },
error=>{
  throw new error
})
}
cancel(){
  if(this.isChange){
    this.isChange=false;
  }
this.Form.reset()
this.isTrySubmit=false;
}

total(){
  console.log(this.orderValues)
}
}
