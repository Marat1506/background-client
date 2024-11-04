import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNumberComponent } from './test-number.component';

describe('TestNumberComponent', () => {
  let component: TestNumberComponent;
  let fixture: ComponentFixture<TestNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
