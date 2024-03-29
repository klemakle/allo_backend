import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from './interface/driver.interface';
import { logger } from 'src/utils/logger';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { handleError } from 'src/utils/error';

@Injectable()
export class DriverService {
  constructor(@InjectModel('Driver') private driverModel: Model<Driver>) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    try {
      logger.info('------CREATE.DRIVER ------- BEGIN');
      const driverExist = await this.driverModel.findOne({
        phone: createDriverDto.phone,
      });
      if (driverExist) {
        throw new HttpException(
          'Un compte avec ce numéro existe déjà !',
          HttpStatus.CONFLICT,
        );
      }
      const driver = new this.driverModel(createDriverDto);
      logger.info('------CREATE.DRIVER ------- SUCCESS');
      return await driver.save();
    } catch (err) {
      handleError(err, 'DRIVER.SERVICE.CREATE');
      throw new HttpException(
        err?.message || 'Erreur interne du serveur',
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Driver[]> {
    try {
      logger.info('------FIND-ALL.DRIVER ------- BEGIN');
      const allDrivers = await this.driverModel
        .find()
        .select(' -created_at -updated_at -password -__v');
      if (!allDrivers) {
        throw new HttpException(
          'Aucun driver dans la base de données',
          HttpStatus.NOT_FOUND,
        );
      }
      logger.info('------FIND-ALL.DRIVER ------- SUCCESS');
      return allDrivers;
    } catch (err) {
      handleError(err, 'DRIVER.SERVICE.FINDALL');
      throw new HttpException(
        err?.message || 'Erreur interne du serveur',
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Driver> {
    try {
      logger.info('------FIND-ONE.DRIVER ------- BEGIN');
      const driverFound = await this.driverModel
        .findById(id)
        .select(' -created_at -updated_at -password -__v');
      if (!driverFound) {
        throw new HttpException(
          "Aucun compte n'est associé à cet identifiant",
          HttpStatus.NOT_FOUND,
        );
      }
      logger.info('------FIND-ONE.DRIVER ------- SUCCESS');
      return driverFound;
    } catch (err) {
      handleError(err, 'DRIVER.SERVICE.FINDONE');
      throw new HttpException(
        err?.message || 'Erreur interne du serveur',
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
