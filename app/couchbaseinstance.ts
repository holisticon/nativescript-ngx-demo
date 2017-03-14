import { Injectable } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase';

@Injectable()
export class CouchbaseInstance {

  private database: any;
  private pull: any;
  private push: any;

  public constructor() {
    this.database = new Couchbase('test-database');
    this.database.createView('people', '1', (document, emitter) => {
      emitter.emit(document._id, document);
    });
  }

  public getDatabase() {
    return this.database;
  }

  public startSync(continuous: boolean) {
    this.push = this.database.createPushReplication('http://192.168.57.1:4984/test-database');
    this.pull = this.database.createPullReplication('http://192.168.57.1:4984/test-database');

    this.push.setContinuous(continuous);
    this.pull.setContinuous(continuous);

    this.push.start();
    this.pull.start();
  }

  public stopSync() {
    this.push.stop();
    this.pull.stop();
  }

}
