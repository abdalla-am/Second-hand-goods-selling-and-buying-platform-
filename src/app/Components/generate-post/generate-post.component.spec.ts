import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePostComponent } from './generate-post.component';

describe('GeneratePostComponent', () => {
  let component: GeneratePostComponent;
  let fixture: ComponentFixture<GeneratePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
