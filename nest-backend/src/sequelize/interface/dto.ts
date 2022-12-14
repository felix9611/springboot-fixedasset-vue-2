
import { ApiProperty } from '@nestjs/swagger'

export class CodeTypeCreatedDto {
  @ApiProperty({
    example: 'Test',
    description: 'The type for category'
  })
  type: string

  @ApiProperty({
    example: 'TestD',
    description: 'The value code'
  })
  valueCode: string

  @ApiProperty({
    example: 'Test Da',
    description: 'The value name'
  })
  valueName: string
}
