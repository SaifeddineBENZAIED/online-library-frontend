import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCmdClientComponent } from './modifier-cmd-client.component';

describe('ModifierCmdClientComponent', () => {
  let component: ModifierCmdClientComponent;
  let fixture: ComponentFixture<ModifierCmdClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierCmdClientComponent]
    });
    fixture = TestBed.createComponent(ModifierCmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
