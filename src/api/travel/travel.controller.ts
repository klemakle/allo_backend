import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { handleError } from 'src/utils/error';

@Controller('api/travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post()
  async create(@Res() res: Response, @Body() createTravelDto: CreateTravelDto) {
    try {
      const travel_created = await this.travelService.create(createTravelDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Voyage créé avec succès !',
        travel: travel_created,
      });
    } catch (error) {
      handleError(error, 'TRAVEL.CONTROLLER.CREATE');
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const all_travels = await this.travelService.findAll();
      return res.status(HttpStatus.OK).json({ travels: all_travels });
    } catch (error) {
      handleError(error, 'TRAVEL.CONTROLLER.FIND-ALL');
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get('/search')
  async findByDestination(@Res() res: Response, @Req() req: Request) {
    try {
      const { destination, location } = req.body;
      const travel_found = await this.travelService.findByDestination(
        destination,
        location,
      );
      return res.status(HttpStatus.OK).json({ travel: travel_found });
    } catch (error) {
      handleError(error, 'TRAVEL.CONTROLLER.FIND-BY-DESTINATION');
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const travel_found = await this.travelService.findOne(id);
      return res.status(HttpStatus.OK).json({ travel: travel_found });
    } catch (error) {
      handleError(error, 'TRAVEL.CONTROLLER.FIND-BY-DESTINATION');
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelDto: UpdateTravelDto) {
    return this.travelService.update(+id, updateTravelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelService.remove(+id);
  }
}
