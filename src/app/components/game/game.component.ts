import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RouteUrl } from "../../shared/route-url";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  tracks!: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.getTracks();
  }

  goBack() {
    this.router.navigateByUrl(RouteUrl.HOME);
  }

    private getTracks() {
      const code = this.route.snapshot.paramMap.get('code')!;
      this.sessionService.getSessionTracks(code).subscribe(
        (data: string[]) => {
          this.tracks = data;
        });
    }
}
