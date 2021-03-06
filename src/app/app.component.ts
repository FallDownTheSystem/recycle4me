import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Recycle4Me';

	constructor(public afAuth: AngularFireAuth) { }

	googleLogin() {
		this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}

	facebookLogin() {
		this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
	}

	emailLogin() {
		// Jos me joskus halutaan tehä oma rekisteröinti
		return;
	}

	logout() {
		this.afAuth.auth.signOut();
	}
}
