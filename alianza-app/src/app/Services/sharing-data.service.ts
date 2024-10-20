import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  private readonly _newClientEventEmitter: EventEmitter<any> =
    new EventEmitter<any>();

  private readonly _sharedKeyClientEventEmitter = new EventEmitter();

  constructor() {}

  get newClientEventEmitter() {
    return this._newClientEventEmitter;
  }

  get sharedKeyClientEventEmitter() {
    return this._sharedKeyClientEventEmitter;
  }
}
