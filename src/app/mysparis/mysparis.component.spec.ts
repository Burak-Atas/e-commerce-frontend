import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysparisComponent } from './mysparis.component';

describe('MysparisComponent', () => {
  let component: MysparisComponent;
  let fixture: ComponentFixture<MysparisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysparisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MysparisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
