import { IsArray, IsNotEmpty } from 'class-validator';

export class ProcessFormDictDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  @IsArray()
  readonly words: string[];
  @IsNotEmpty()
  readonly lang: string;
}
