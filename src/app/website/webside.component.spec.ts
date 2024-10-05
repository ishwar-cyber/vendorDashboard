import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsideComponent } from './webside.component';

describe('WebsideComponent', () => {
  let component: WebsideComponent;
  let fixture: ComponentFixture<WebsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
