import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Pickup } from '../model/pickup';

@Injectable()
export class ApiService {

	constructor(private http: HttpClient) { }

	getAllPickups(): Observable<any> {
		return this.http.get('https://recycle4me-9e932.firebaseio.com/pickups.json');
	}
}
