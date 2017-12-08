import { Pickup } from '../model/pickup';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
	pickups: Observable<any[]>;
	displayedColumns = ['address', 'date', 'type', 'description', 'name'];
	dataSource: any;
	pickupData: any;
	constructor(db: AngularFireDatabase) {
		this.pickups = db.list('pickups').valueChanges();
		this.pickups.subscribe(x => {
			console.log(x);
			this.dataSource = new MatTableDataSource<Pickup>(x);
		} );
	
	}
}

