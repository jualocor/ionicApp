import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginNubePage } from './login-nube.page';

describe('LoginNubePage', () => {
  let component: LoginNubePage;
  let fixture: ComponentFixture<LoginNubePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginNubePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginNubePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
