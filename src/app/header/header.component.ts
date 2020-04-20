import { Component } from '@angular/core';
import { DataStrorageService } from '../shared/data-storage.service';


@Component({
 selector: 'app-header',
 templateUrl : './header.component.html',
 styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private datastorage: DataStrorageService) {}

    onSaveData() {
        this.datastorage.storeRecipes();
    }

    onFetchData() {
        this.datastorage.fetchRecipes();
    }
}
