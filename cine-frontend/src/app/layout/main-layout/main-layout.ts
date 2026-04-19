import { Component } from '@angular/core';
import { Navbar } from "../../components/shared/navbar/navbar";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './main-layout.html',
})
export class MainLayout {}
