import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavMenuComponent } from './nav-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      imports: [
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: {} },
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a mat-sidenav', () => {
    const sidenav = fixture.debugElement.query(By.css('mat-sidenav'));
    expect(sidenav).toBeTruthy();
  });

  it('should contain a mat-icon', () => {
    const matIcon = fixture.debugElement.query(By.css('mat-icon'));
    expect(matIcon).toBeTruthy();
  });

  it('should contain a mat-list', () => {
    const matList = fixture.debugElement.query(By.css('mat-nav-list'));
    expect(matList).toBeTruthy();
  });
});
