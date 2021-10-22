import { IsNotEmpty, IsDate } from 'class-validator';
export class CreateTravelDto {
  @IsNotEmpty()
  destination: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  driver: string;

  @IsDate()
  departureTime: Date;

  price: string;

  @IsDate()
  readonly created_at: Date;

  @IsDate()
  readonly updated_at: Date;
}
