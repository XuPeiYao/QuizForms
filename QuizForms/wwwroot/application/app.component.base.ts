import { Component, Input, AfterContentInit, Output, AfterViewChecked } from '@angular/core';
declare var componentHandler;
export class ComponentBase implements AfterContentInit, AfterViewChecked {
    @Input()
    @Output()
    public data:any;
    
    ngAfterViewChecked(): void {
        componentHandler.upgradeAllRegistered();

        if(this.AfterViewChecked)this.AfterViewChecked();
    }

    ngAfterContentInit(): void {
        componentHandler.upgradeAllRegistered();

        if(this.AfterContentInit)this.AfterContentInit();
    }

    

    public AfterContentInit : ()=>void = null;
    public AfterViewChecked : ()=>void = null;
}