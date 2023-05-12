import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() btnText: string;
  @Input() loadingText: string;
  @Input() btnIcon: string;

  constructor() { }

  ngOnInit(): void {
  }

  getBtnClass(): string{
    return this.btnIcon ? 'btn-icon' : '';
  }

}
