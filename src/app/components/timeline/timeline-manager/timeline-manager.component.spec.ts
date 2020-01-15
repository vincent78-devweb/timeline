import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineManagerComponent } from './timeline-manager.component';

describe('TimelineManagerComponent', () => {
  let component: TimelineManagerComponent;
  let fixture: ComponentFixture<TimelineManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
