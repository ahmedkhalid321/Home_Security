import { TestBed } from '@angular/core/testing';

import { EmailValidateService } from './email-validate.service';

describe('EmailValidateService', () => {
  let service: EmailValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
