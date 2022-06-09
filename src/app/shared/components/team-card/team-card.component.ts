import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {
  @Input() teamId: string = '';
  @Input() name: string = '';
  @Input() logo: string = '';
  @Output() onClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.onClick.emit(this.teamId);
  }
}
