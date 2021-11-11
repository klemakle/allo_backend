import { IsNotEmpty, IsDate, IsPhoneNumber, MinLength } from 'class-validator';
export class CreateDriverDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  hasAccess: boolean;

  @IsDate()
  readonly created_at: Date;

  @IsDate()
  readonly updated_at: Date;
}
