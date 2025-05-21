import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';

@ApiTags('services')
@ApiBearerAuth() // Documenta que a API requer autenticação
@ApiHeader({
  name: 'x-api-key',
  description: 'Chave de API para autenticação',
  required: true,
})
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Public() // Apenas GET é público, outras operações requerem autenticação
  @Get()
  @ApiOperation({ summary: 'Listar todos os serviços' })
  async findAll() {
    return this.servicesService.findAll();
  }

  @Public() // GET por ID também é público
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um serviço pelo ID' })
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo serviço' })
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um serviço existente' })
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um serviço' })
  async remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}