import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: document.getElementsByTagName("app-root")[0].innerHTML.trim()
})
export class AppRootComponent{
    /**
     * 根元件資料
     */
    public _data:any = {};

    public get data():any{
      return this._data;
    }

    public set data(value:any){
      this._data = value;
      console.log(value);
    }
}