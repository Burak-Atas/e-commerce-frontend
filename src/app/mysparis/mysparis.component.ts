import { Component, OnInit } from '@angular/core';
import { MySparisService } from '../services/mysparis.service';
import { MySparis } from '../models/sparis';

@Component({
  selector: 'app-mysparis',
  templateUrl: './mysparis.component.html',
  styleUrls: ['./mysparis.component.css'],
  providers:[MySparisService]
})
export class MysparisComponent implements OnInit {

  sparis:MySparis[];

  constructor(private mySparisService:MySparisService) { }

  ngOnInit(): void {
    this.mySparisService.getSparis().subscribe(data=>{
      console.log("sparis data",data.sparis)
      this.sparis = data.sparis
    })
  }

  translate(tarihSaatStr:any) {
    const tarihSaat = new Date(tarihSaatStr);
    
    const günler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    const gün = tarihSaat.getDate();
    const ay = tarihSaat.getMonth();
    const saat = tarihSaat.getHours();
    const dakika= tarihSaat.getMinutes()

    const günAdı = günler[tarihSaat.getDay()];
    const ayAdı = aylar[ay];

    return `${gün} ${ayAdı} ${günAdı}, Saat: ${saat}:${dakika}`;
}





}

