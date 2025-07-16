import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipallyComponent } from './principally.component';

describe('PrincipallyComponent', () => {
  let component: PrincipallyComponent;
  let fixture: ComponentFixture<PrincipallyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipallyComponent]
    });
    fixture = TestBed.createComponent(PrincipallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
