import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UrlPathRole } from '../../type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  urlPath: string = '';
  isAdminActive: boolean = false;
  isCoachActive: boolean = false;
  isRefereeActive: boolean = false;

  routeSubscription: Subscription | undefined;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.events.subscribe((ev: any) => {
      if (!ev.routerEvent) return;
      this.urlPath = ev.routerEvent.url;
      const role = this.urlPath.split('/')[1] as UrlPathRole;

      this.isAdminActive = role === 'admin';
      this.isCoachActive = role === 'coach';
      this.isRefereeActive = role === 'referee';
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
