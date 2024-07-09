import { TestBed } from '@angular/core/testing';

import { MailserviceService } from './mailservice.service';

describe('MailserviceService', () => {
  let service: MailserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
