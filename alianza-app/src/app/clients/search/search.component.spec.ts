import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClientSearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: ClientSearchComponent;
  let fixture: ComponentFixture<ClientSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientSearchComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
