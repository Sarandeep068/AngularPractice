import { Component } from '@angular/core';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
  } from '@angular/router';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styles: [`
  .loading20{
    position: absolute;
    top: 50%;
    left:50%;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background-color: rgba(0,0,0,.5);
}

.loading20 .squre{
    position:absolute;
    top:30px; left: 34px;
    width: 30px;
    height:30px;
    border: 4px solid #ffffff;
    background-color: transparent;
    -webkit-transform:rotateZ(45deg);
}
.loading20 .squre1{
    border-bottom: none;
    border-right: none;
    -webkit-animation:squer1 2.5s linear infinite;
    -webkit-animation-direction:alternate;
}
.loading20 .squre2{
    border-top: none;
    border-left: none;
    -webkit-animation:squer2 2.5s linear infinite;
    -webkit-animation-direction:alternate;
}

@-webkit-keyframes squer1{
    0%{
        -webkit-transform:translateX(0px) rotateZ(45deg);
    }
    25%{
        -webkit-transform:translateX(-13px) rotateZ(45deg);
    }
    75%{
        -webkit-transform:rotateX(180deg)  rotateZ(45deg);
    }
    100%{
        -webkit-transform:translateX(0px) rotateZ(90deg);
    }
}
@-webkit-keyframes squer2{
    0%{
        -webkit-transform:translateX(0px) rotateZ(45deg);
    }
    25%{
        -webkit-transform:translateX(8px) rotateZ(45deg);
    }
    75%{
        -webkit-transform:rotateX(180deg) rotateZ(45deg);
    }
    100%{
        -webkit-transform:translateX(0px) rotateZ(90deg)
    }
}
`]
})
export class AppComponent {
  pageTitle: string = 'Angular Practice';

  // Sets initial value to true to show loading spinner on first load
  public loading = true;

  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
