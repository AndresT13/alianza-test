import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavMenuComponent } from './nav-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav'; // Para mat-sidenav-container y mat-sidenav
import { MatIconModule } from '@angular/material/icon'; // Para mat-icon
import { MatListModule } from '@angular/material/list'; // Para mat-nav-list
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Necesario para animaciones de Material
import { RouterTestingModule } from '@angular/router/testing'; // Para pruebas de enrutamiento
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute
import { of } from 'rxjs'; // Necesario para simular ActivatedRoute
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
        BrowserAnimationsModule, // Necesario para que los componentes de Material funcionen bien
        RouterTestingModule, // Usar RouterTestingModule en lugar de RouterModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Aquí simulamos cualquier propiedad que necesites, como params o queryParams
            snapshot: { paramMap: {} }, // Proveer un paramMap vacío si no usas parámetros
            params: of({}), // Simulamos los parámetros de la ruta como un observable
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
