import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadButtonSecondaryComponent } from './download-button-secondary.component';

describe('DownloadButtonSecondaryComponent', () => {
  let component: DownloadButtonSecondaryComponent;
  let fixture: ComponentFixture<DownloadButtonSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadButtonSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadButtonSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
