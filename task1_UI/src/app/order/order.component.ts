import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { get } from 'http';
import { ActivatedRoute, Routes } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  
})
export class OrderComponent implements OnInit {

  //content change
    isViewChange:boolean=false;
    isFormChange:boolean=false;
    isTableChange:boolean=false;

amount: any;
getTotal:any;
totalAmount:[]|any;
public uniqueValues:string[]|any=[];;
public orderValues:string[] | any;

currentIndex:any;
  constructor(private http:HttpClient,  private router: Router){

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
amount:new FormControl(),
date:new FormControl('',[Validators.required]),

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
  
  if(!this.isTableChange){
    this.isTableChange=true;
  }
  this.Form.get(['name'])?.patchValue(v.name)
  this.Form.get(['itemName'])?.patchValue(v.itemName)
  this.Form.get(['unitPrice'])?.patchValue(v.unitPrice)
  this.Form.get(['quantity'])?.patchValue(v.quantity)
  this.Form.get(['date'])?.patchValue(v.date)
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
        this.isTableChange=false;
        window.location.reload()
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
      window.location.reload();
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
  if(this.isChange && this.isTableChange){
    this.isChange=false;
    this.isTableChange=false;
  }
this.Form.reset()
this.isTrySubmit=false;
}

total(){
  console.log(this.orderValues)
}

// for change view
newOrder(){
  if(!this.isViewChange){
    this.isViewChange=true;
  }
}
forCancel(){
  if(this.isViewChange){
    this.isViewChange=false
  }
}
formChange(){
  if(this.isFormChange){
    this.isFormChange=true
  }
}

count_user_click = 0;
list(){
  this.router.navigate(['task']);
  console.log("changing router")
}

contentChange:boolean=false;
contentEdit(value:any,id:number):void
{
  if(!this.contentChange){
    this.contentChange=true;
  }

  this.Form.get(['name'])?.patchValue(value.name)
  this.Form.get(['itemName'])?.patchValue(value.itemName)
  this.Form.get(['unitPrice'])?.patchValue(value.unitPrice)
  this.Form.get(['quantity'])?.patchValue(value.quantity)
  this.Form.get(['date'])?.patchValue(value.date)
  console.log(value.name)
  this.currentIndex=id
  this.Form.updateValueAndValidity()
  const url=`${this.apiUrl}`     
  this.http.get('http://localhost:3000/register/'+`${id}`).subscribe((res:any)=>{
    if(res.statusCode==200){
     this.uniqueValues=(res.data)
     console.log(this.uniqueValues,"unique values")
      
    }else{
      alert("error accured")
    }
  },error=>{
    throw new error;
  })

}
updateSaveContent(id:number){
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
        this.isTableChange=false;
       }
    }
    else if(res.statusCode==400 || res.statusCode==500){
      console.log(res.message)
    }  
  },error=>{
    throw new error;
  })
}
contentDelete(id:number){
  return this.http.delete('http://localhost:3000/register/'+`${id}`).subscribe((res:any)=>{
    if(res.statusCode==200){
      window.location.reload();
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
cancelContent():void{
  this.Form.reset()
  if(this.contentChange){
    this.contentChange=false;
  }
  // this.router.navigate(['home'])
  this.isTrySubmit=false;
}
}
