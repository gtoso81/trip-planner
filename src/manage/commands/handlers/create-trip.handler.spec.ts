import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Trip } from '../../schema/trip.schema';
import { mockCreateDto, mockTripResponse, mockTripResponseService } from '../../manage.mock';
import { CreateTripHandler } from './create-trip.handler';
import { CreateTripCommand } from '../impl/create-trip.command';

describe('CreateTripHandler', () => {
  let handler: CreateTripHandler;

  const mockTripModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTripHandler,
        {
          provide: getModelToken(Trip.name),
          useValue: mockTripModel,
        },
      ],
    }).compile();

    handler = module.get<CreateTripHandler>(CreateTripHandler);
  });

  it('should create a trip', async () => {
    const createDto = mockCreateDto;
    mockTripModel.create.mockResolvedValue(mockTripResponseService);
    const result = await handler.execute(new CreateTripCommand(createDto));
    expect(result).toEqual(mockTripResponse);
  });
});