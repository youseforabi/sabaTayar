import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsManagerComponent } from './ads-manager.component';

describe('AdsManagerComponent', () => {
  let component: AdsManagerComponent;
  let fixture: ComponentFixture<AdsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
