import { Component, OnInit } from '@angular/core';
interface Logo {
  companyName: string;
  imgUrl:string;
  ratting: number;
}
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

}
