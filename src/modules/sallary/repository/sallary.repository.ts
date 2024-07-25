import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Sallary } from '../../../model/entities/sallary.entity';

@Injectable()
export class SallaryRepository extends Repository<Sallary> {
  constructor(private dataSource: DataSource) {
    super(Sallary, dataSource.createEntityManager());
  }
}
