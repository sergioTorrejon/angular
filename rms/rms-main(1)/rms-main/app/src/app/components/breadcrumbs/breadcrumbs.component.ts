import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthorizationService,
} from 'src/app/authentication/services/authorization.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() model: any;
  constructor(
    public authorizationService: AuthorizationService,
    private router: Router
    ) {
    }

  ngOnInit() {
  }

}

