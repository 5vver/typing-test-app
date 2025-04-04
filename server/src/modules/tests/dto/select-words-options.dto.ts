import { IsUUID } from 'class-validator';

export class SelectWordsOptionsDto {
  @IsUUID()
  dictId: string;
  lang?: string;
}
