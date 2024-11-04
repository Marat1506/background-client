import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCheckboxComponent } from './test-checkbox.component';

describe('TestCheckboxComponent', () => {
  let component: TestCheckboxComponent;
  let fixture: ComponentFixture<TestCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
