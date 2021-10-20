import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { handleError } from 'src/utils/error';
import { logger } from 'src/utils/logger';
import { Driver } from '../driver/interface/driver.interface';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { Travel } from './interface/travel.interface';

const error_servor = 'Erreur interne du serveur';
@Injectable()
export class TravelService {
  constructor(
    @InjectModel('Travel') private travelModel: Model<Travel>,
    @InjectModel('Driver') private driverModel: Model<Driver>,
  ) {}

  async create(createTravelDto: CreateTravelDto): Promise<Travel> {
    try {
      logger.info('------CREATE.TRAVEL ------- BEGIN');
      const driver_who_want_create_travel = await this.driverModel.findById(
        createTravelDto.driver,
      );
      if (!driver_who_want_create_travel) {
        throw new HttpException(
          "Il n'existe pas de driver avec cet id",
          HttpStatus.NOT_FOUND,
        );
      }
      const new_travel = new this.travelModel(createTravelDto);
      logger.info('------CREATE.TRAVEL ------- SUCCESS');
      return await new_travel.save();
    } catch (err) {
      handleError(err, 'TRAVEL.SERVICE.CREATE');
      const errorMessage = err?.message || error_servor;
      const errorStatus = err?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMessage, errorStatus);
    }
  }

  async findOne(id: string): Promise<Travel> {
    logger.info('------FIND-ONE.TRAVEL ------- BEGIN');
    try {
      const travel_found = await this.travelModel.findById(id);
      if (!travel_found) {
        throw new HttpException(
          'Aucun voyage avec cet id !',
          HttpStatus.NOT_FOUND,
        );
      }
      logger.info('------FIND-ONE.TRAVEL ------- SUCCESS');
      return travel_found;
    } catch (err) {
      handleError(err, 'TRAVEL.SERVICE.FIND-ONE');
      const errorMessage = err?.message || error_servor;
      const errorStatus = err?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMessage, errorStatus);
    }
  }

  async findByDestination(
    destination: string,
    location: string,
  ): Promise<Travel[]> {
    logger.info('------FIND-BY.DESTINATION.TRAVEL ------- BEGIN');
    try {
      const travels_found = await this.travelModel
        .find({
          $and: [
            { isDeleted: { $ne: true } },
            { completed: { $ne: true } },
            { destination: destination },
            { location: location },
          ],
        })
        .select('-__v -completed -isDeleted')
        .populate({
          path: 'driver',
          model: 'Driver',
          select: 'firstname lastname phone',
        });
      if (!travels_found) {
        throw new HttpException('Aucun voyage trouvé !', HttpStatus.NOT_FOUND);
      }
      logger.info('------FIND-BY.DESTINATION.TRAVEL ------- SUCCESS');
      return travels_found;
    } catch (err) {
      handleError(err, 'TRAVEL.SERVICE.FIND-ONE');
      const errorMessage = err?.message || error_servor;
      const errorStatus = err?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMessage, errorStatus);
    }
  }

  async findAll() {
    try {
      const all_travels = await this.travelModel.find()
      return all_travels;
    } catch (err) {
      handleError(err, 'TRAVEL.SERVICE.FIND-ALL');
      const errorMessage = err?.message || error_servor;
      const errorStatus = err?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMessage, errorStatus);
    }
  }

  update(id: number, updateTravelDto: UpdateTravelDto) {
    return `This action updates a #${id} travel`;
  }

  remove(id: number) {
    return `This action removes a #${id} travel`;
  }
}
