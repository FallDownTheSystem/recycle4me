// Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NguiMapModule} from '@ngui/map';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ReactiveFormsModule } from '@angular/forms';
// Import the NgModule for each component you want to use:
import { 	MatButtonModule, MatCheckboxModule, MatListModule, MatToolbarModule,
					MatTabsModule, MatIconModule, MatInputModule, MatSnackBarModule,
					MatExpansionModule, MatSelectModule, MatDatepickerModule,
					MatNativeDateModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
// Components
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { GmapComponent} from './gmap/gmap.component';
import { GeolocationService } from './services/geolocation.service';
import { environment } from '../environments/environment';
import { AdminComponent } from './admin/admin.component';
import { ApiService } from './services/api.service';

// Services
////
@NgModule({
	declarations: [
		AppComponent,
		InfoComponent,
		FrontPageComponent,
		GmapComponent,
		AdminComponent
	],
	imports: [
		NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAI368OuKSOMpfH9xNYwdnpe6HGUI_-VVg'}),
		BrowserModule,
		HttpClientModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatListModule,
		MatToolbarModule,
		MatTabsModule,
		MatIconModule,
		MatInputModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTableModule,
		ReactiveFormsModule,
		HttpModule
	],
	providers: [GeolocationService, ApiService],
	bootstrap: [AppComponent]
})
export class AppModule { }
