import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

	pickups: Observable<any[]>;
	constructor(db: AngularFireDatabase) {
		this.pickups = db.list('pickups').valueChanges();
	}
}
