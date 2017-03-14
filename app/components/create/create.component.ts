import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CouchbaseInstance } from '../../couchbaseinstance';

@Component({
  selector: 'create',
  templateUrl: './create.component.html'
})

export class CreateComponent {

  private couchbaseInstance: CouchbaseInstance;
  private database: any;
  private location: Location;
  public firstname: string;
  public lastname: string;

  constructor(location: Location, couchbaseInstance: CouchbaseInstance) {
    this.database = couchbaseInstance.getDatabase();
    this.location = location;
    this.firstname = '';
    this.lastname = '';
  }

  save() {
    if (this.firstname !== '' && this.lastname !== '') {
      this.database.createDocument({
        'firstname': this.firstname,
        'lastname': this.lastname
      });
      this.location.back();
    }
  }

}
