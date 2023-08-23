import { TestBed } from '@angular/core/testing';

import { PhoneValidateService } from './phone-validate.service';

describe('PhoneValidateService', () => {
  let service: PhoneValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
