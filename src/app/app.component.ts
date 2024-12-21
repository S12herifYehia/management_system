import { ChangeDetectorRef, Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
//! الانبوتس تخزن هنا
  title1=''
  price1:number=0;
  taxes1:number=0;
  ads1:number=0;
  discount1:number=0;
  count1=''
  catogery1=''
  Total:number=0;

//! تهيئه تحديث الداتا
  DataForm={
    title:'',
    price:'',
    taxes:'',
    ads:'',
    discount:'',
    count:'',
    category:''
  };

//! Array
Product:any=[];

// !upadate_create
  modebtn=true
  currentIndex:any;


//! Get Total
getTotal(){
  if(this.price1 != 0 && this.price1 != null){
    return this.Total=(this.price1 + this.taxes1 + this.ads1) - this.discount1
  }else{
    return this.Total=0
  }

}

//! Create Data




StorageData(pro:any){
  if('cruds' in localStorage){
    this.Product=JSON.parse(localStorage.getItem('cruds')!)
    this.Product.push(pro)
    localStorage.setItem('cruds',JSON.stringify(this.Product));
  }else{
    this.Product.push(pro)
    localStorage.setItem('cruds',JSON.stringify(this.Product));
  }
}

CreateData(val:any){
    const pro={
      valinp:val,
      valtotal:this.getTotal()
    }

    if(pro.valinp.count > 1){


      for(var i=0; i < pro.valinp.count; i++){

        this.StorageData(pro)
      }


    }else{
      this.StorageData(pro)

    }




    this.filter = [...this.Product];

}


// !Search
// filterProduct:any=[]

ngOnInit(){
  this.getTotal()
  if(localStorage.getItem('cruds') != null){
    this.Product=JSON.parse(localStorage.getItem('cruds')!)
  }else{
    this.Product=[]
  }

  this.filter=[...this.Product]




}








  onSubmit(f:any){

    // this.modebtn=true;
   if(f.valid){
    if(this.Total != 0){

      if(this.modebtn){
        this.CreateData(f.value)
        console.log(f.value)
        // بتعمل اعاده تعيين للحقول والحاله
        f.resetForm(this.DataForm);
      }else{

        if (this.currentIndex != null && this.Product[this.currentIndex]) {
          this.Product[this.currentIndex].valinp.title = f.value.title;
          this.Product[this.currentIndex].valinp.price = f.value.price;
          this.Product[this.currentIndex].valinp.taxes = f.value.taxes;
          this.Product[this.currentIndex].valinp.ads = f.value.ads;
          this.Product[this.currentIndex].valinp.discount = f.value.discount;
          this.Product[this.currentIndex].valinp.count = f.value.count;
          this.Product[this.currentIndex].valinp.category = f.value.category;
          // تحديث المجموع الكلي
          this.Product[this.currentIndex].valtotal = this.getTotal();
          // تحديث البيانات في LocalStorage
          localStorage.setItem('cruds', JSON.stringify(this.Product));
          // f.form.patchValue(this.DataForm); // إعادة تعيين الحقول
          f.resetForm(this.DataForm);
          this.modebtn = true; // العودة لوضع الإضافة
        }
      }
     }else{

      alert('Add Total Data')


  }


  this.filter = [...this.Product];
    }


  }




  //! updateData()

  updateData(i:any){



    const selectedProduct = this.Product[i];
    this.title1 = selectedProduct.valinp.title;
    this.price1 = selectedProduct.valinp.price;
    this.taxes1 = selectedProduct.valinp.taxes;
    this.ads1 = selectedProduct.valinp.ads;
    this.discount1 = selectedProduct.valinp.discount;
    this.count1 = selectedProduct.valinp.count;
    this.catogery1 = selectedProduct.valinp.category;

    this.modebtn = false; // تفعيل وضع التعديل
    this.currentIndex = i;
    console.log(this.currentIndex);



    // عملت دي علشان تفضل مخزنه فيها الداتا بحيث لما مفقدش الداتا

    this.filter = [...this.Product];


  }



  // ! DeleteDate


  DeleteDate(i:any){
    this.Product.splice(i,1);

    localStorage.setItem('cruds',JSON.stringify(this.Product))
    this.filter = [...this.Product];
  }



  // ! inpSer

  modesearch=true;


  @ViewChild('inpser') inpser!:ElementRef;

  render:Renderer2=inject(Renderer2);

filter:any=[];

  SearchInput(val:any){
    if(this.modesearch){
      this.filter= this.Product.filter((f:any)=>{
        return f.valinp.title.toLowerCase().includes(val.toLowerCase());
      })
      }else{
        this.filter=this.Product.filter((f:any)=>{
          return f.valinp.category.toLowerCase().includes(val.toLowerCase())
        })
      }

  }


  // ! SearchByTitle()



  SearchByTitle(){
    this.modesearch=true;

    this.render.setAttribute(this.inpser.nativeElement,'placeholder','Search By Title')



  }



  // ! SearchByCatogery


  SearchByCatogery(){

    this.modesearch=false;
    this.render.setAttribute(this.inpser.nativeElement,'placeholder','Search By Catogery')
  }

}






