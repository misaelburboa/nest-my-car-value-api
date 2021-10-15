import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let fakeReportRepository: Repository<Report>;

  beforeEach(async () => {
    fakeReportRepository = {} as Repository<Report>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: fakeReportRepository,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});