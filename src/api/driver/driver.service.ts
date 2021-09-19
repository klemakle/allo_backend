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
      const errorMessage = err.message || 'Erreur interne du serveur';
      const errorStatus = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMessage, errorStatus);
    }
  }

  findAll() {
    return `This action returns all driver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
