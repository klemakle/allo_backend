import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { handleError } from 'src/utils/error';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('api/driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('/add')
  async create(@Res() res: Response, @Body() createDriverDto: CreateDriverDto) {
    try {
      const driverCreated = await this.driverService.create(createDriverDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Compte créé avec succès !',
        driver: driverCreated,
      });
    } catch (error) {
      handleError(error, 'DRIVER.CONTROLLER.CREATE');
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const allDrivers = await this.driverService.findAll();
      return res.status(HttpStatus.OK).json({
        drivers: allDrivers,
      });
    } catch (error) {
      handleError(error, 'DRIVER.CONTROLLER.FINDALL');
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get('/:id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const driverFound = await this.driverService.findOne(id);
      return res.status(HttpStatus.OK).json({
        driver: driverFound,
      });
    } catch (error) {
      handleError(error, 'DRIVER.CONTROLLER.FINDONE');
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
