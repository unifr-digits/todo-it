import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SyncService } from '../sync.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  syncStatus = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, private syncService: SyncService) {}

  sync() {
    this.syncService
      .sync()
      .then((result) => {
        console.log(result);
        this.syncStatus = result.toString();
      })
      .catch((error) => {
        console.log(error.error);
        this.syncStatus = error.error;
      });
  }
}
