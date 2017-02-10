/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DibsComponent } from './dibs.component';

describe('DibsComponent', () => {
  let component: DibsComponent;
  let fixture: ComponentFixture<DibsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DibsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DibsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
