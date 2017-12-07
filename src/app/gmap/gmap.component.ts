import { Coords } from '../model/coords';
import { Pickup } from '../model/pickup';
import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';
import { Location } from '@angular/common';
import { NguiMapComponent } from '@ngui/map';
import { BrowserModule } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';  // <-- #1 import module
import {} from '@types/googlemaps';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { Http } from '@angular/http';


declare var google: any;
@Component({
	selector: 'app-gmap',
	templateUrl: './gmap.component.html',
	styleUrls: ['./gmap.component.scss']
})

export class GmapComponent implements AfterViewInit, OnDestroy {
	@ViewChild(NguiMapComponent)
	map: NguiMapComponent;
	marker: any;
	pos= {
		lat: 61.064846,
		lng: 28.093114
	};

	mapOptions = {
		center: this.pos,
		zoom: 12
	};

	param: any;
	geoloc: Coords = null;
	geoSub: any;
    httpRequester:any;
	pickup: Pickup;
	pickupform: FormGroup;

	pickupsRef: AngularFireList<any>;
	constructor(private geolocService: GeolocationService,
							private fb: FormBuilder,
							private db: AngularFireDatabase,
							public snackBar: MatSnackBar,
                            private http: Http) {
                                this.httpRequester=http;
		const geoObserver = {
			next: x => this.geoloc = new Coords(x.coords.latitude, x.coords.longitude, x.coords.accuracy),
			error: err => console.error('Geolocation observer error: ' + err),
			complete: () => this.updateMapGeoloc(),
		};

		this.geoSub = geolocService.getCurrentPosition().subscribe(subject => subject(geoObserver));

		this.pickup = new Pickup();
		this.createForm(this.pickup);
		this.pickupsRef = db.list('pickups');
	}

	createForm(pickup: Pickup) {
		this.pickupform = this.fb.group({
			address: [pickup.address, Validators.required],
			date: [pickup.date],
			timeofday: [pickup.timeofday],
			type: [pickup.type],
			description: [pickup.description, Validators.required]
		});
	}

	updateMapGeoloc() {
		this.pos.lat = this.geoloc.latitude;
		this.pos.lng = this.geoloc.longitude;
		this.map.mapOptions.center = this.pos;
		if (this.marker !== undefined) {
			this.marker.setPosition(this.pos);
		}
	}

	onMarkerInit(marker) {
		this.marker = marker;
	}

	ngAfterViewInit() {
		const __this = this;
	}

	onMarkerDrag(event) {
		this.setLoc(event.latLng);
	}

	mapClicked(event) {
		this.setLoc(event.latLng);
        console.log(event.latLng.lat())
	}

	ngOnDestroy() {
		if (this.geoSub) {
			this.geoSub.unsubscribe();
		}
	}

	setLoc(cords: any) {
		this.marker.setPosition(cords);
		this.pos.lat = cords.lat();
		this.pos.lng = cords.lng();
        this.httpRequester.get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + cords.lat() + ","+cords.lng()+"&sensor=true&key=AIzaSyAI368OuKSOMpfH9xNYwdnpe6HGUI_-VVg"
        ).subscribe(data => {
            var addressData=JSON.parse(data._body).results[0].address_components;
            if (addressData[0].long_name=="Unnamed Road") {
                if (addressData.length==3)
                    var address = addressData[0].long_name + ", " + addressData[1].long_name;
                else if (addressData.length==4)
                    var address = addressData[0].long_name + ", " + addressData[3].long_name + " " + addressData[1].long_name;
                else
                    var address = addressData[0].long_name + ", " + addressData[4].long_name + " " + addressData[1].long_name;
            }
            else {
                if (addressData.length==5) 
                    var address = addressData[1].long_name + " " + addressData[0].long_name + ", " + addressData[4].long_name + " " + addressData[2].long_name;
                else if (addressData.length==4)
                    var address = addressData[1].long_name + " " + addressData[0].long_name + ", " + addressData[2].long_name;
                else if (addressData.length==3)
                    var address = addressData[0].long_name + ", " + addressData[1].long_name;
                else
                    var address = addressData[1].long_name + " " + addressData[0].long_name + ", " + addressData[5].long_name + " " + addressData[3].long_name;
                
            }
            console.log(address)
        });
	}

	setGeo() {
		this.marker.setPosition({lat: this.geoloc.latitude, lng: this.geoloc.longitude});
		this.map.mapOptions.center = this.pos;
		this.map.setCenter();
		// this.map.setCenter({lat:this.geoloc.latitude, lng:this.geoloc.longitude});
	}

	getLoc() {
		return this.pos;
	}

	onPickupSubmit() {
		this.pickup = this.pickupform.value;
		this.pickupsRef.push(this.pickup).then(
			success => {
				this.pickupform.reset();
				this.snackBar.open('Request succesfully sent.', 'OK', {
					duration: 3000
				});
			},
			err => console.log(err));
	}

}

interface Marker {
	position: google.maps.LatLng;
	label?: string;
	draggable: boolean;
}
