import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/addess.service';
import { Address } from '../models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  myadress:Address
  constructor(private addressService:AddressService) { }

  ngOnInit(): void {
    this.addressService.gettoaddress().subscribe(data=>{
      this.myadress=data.address[0]
    })
  }
  addressGonder(house_name:any,street_name:any,city_name:any,pin_code:any){
    const address={
      id:"", 
      house_name:house_name.value ,         
      street_name:street_name.value ,           
      city_name:city_name.value   ,        
      pin_code:pin_code.value  ,     
    }

    console.log(address);
    

    this.addressService.addaddress(address).subscribe(data=>{
      console.log(data);
      
    })
  }

  EditAdress(house_name:any,street_name:any,city_name:any,pin_code:any){
    const address={
      id:"", 
      house_name:house_name.value ,         
      street_name:street_name.value ,           
      city_name:city_name.value    ,        
      pin_code:pin_code.value ,     
    }
    console.log(address);
    this.addressService.edittoaddress(address).subscribe(data=>{
      console.log(data);
      
    })
  }
  removeAddress(){
    this.addressService.removetoaddress().subscribe(data=>{console.log(data)})
  }
}
