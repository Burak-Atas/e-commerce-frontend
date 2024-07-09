import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtCreateComponent } from './ct-create.component';

describe('CtCreateComponent', () => {
  let component: CtCreateComponent;
  let fixture: ComponentFixture<CtCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
