import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BluePage } from './blue.page';

describe('BluePage', () => {
  let component: BluePage;
  let fixture: ComponentFixture<BluePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BluePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
