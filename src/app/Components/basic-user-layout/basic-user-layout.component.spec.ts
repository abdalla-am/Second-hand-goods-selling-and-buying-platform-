import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicUserLayoutComponent } from './basic-user-layout.component';

describe('BasicUserLayoutComponent', () => {
  let component: BasicUserLayoutComponent;
  let fixture: ComponentFixture<BasicUserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicUserLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
