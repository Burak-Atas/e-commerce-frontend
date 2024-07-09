import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdCreateComponent } from './pd-create.component';

describe('PdCreateComponent', () => {
  let component: PdCreateComponent;
  let fixture: ComponentFixture<PdCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
