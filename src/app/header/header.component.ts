import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStrorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
 selector: 'app-header',
 templateUrl : './header.component.html',
 styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated = false;

    private userSUB: Subscription;

    constructor(private datastorage: DataStrorageService, private authservice: AuthService) {}
    

    ngOnInit(): void {
        this.userSUB = this.authservice.user.subscribe(
            user => {
                this.isAuthenticated = !!user;
            }
        );
    }

    onSaveData() {
        this.datastorage.storeRecipes();
    }

    onFetchData() {
        this.datastorage.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
       this.userSUB.unsubscribe();
    }
    
}
