import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create({ ...reportDto, user });

    return this.repo.save(report);
  }

  async approveReport(id: number, attrs: Partial<Report>) {
    const report = await this.repo.findOneBy({ id });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    Object.assign(report, attrs);

    return this.repo.save(report);
  }
}
