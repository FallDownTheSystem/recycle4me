import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../services/api.service';


@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
	pickups: Observable<any[]>;

	// constructor(db: AngularFireDatabase, public api: ApiService) {
	// 	this.pickups = api.getAllPickups().toArray();

	constructor(db: AngularFireDatabase) {
		this.pickups = db.list('pickups').valueChanges();
	}
}
