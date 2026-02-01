import { Test, TestingModule } from '@nestjs/testing';
import { mockCreateDto, mockTripResponse, mockTripResponseDB } from '../../manage.mock';
import { CreateTripHandler } from './create-trip.handler';
import { CreateTripCommand } from '../impl/create-trip.command';
import { TripRepository } from '../../trip.repository';

describe('CreateTripHandler', () => {
  let handler: CreateTripHandler;

  const mockTripRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTripHandler,
        {
          provide: TripRepository,
          useValue: mockTripRepository,
        },
      ],
    }).compile();

    handler = module.get<CreateTripHandler>(CreateTripHandler);
  });

  it('should create a trip', async () => {
    const createDto = mockCreateDto;
    mockTripRepository.create.mockResolvedValue(mockTripResponseDB);
    const result = await handler.execute(new CreateTripCommand(createDto));
    expect(result).toEqual(mockTripResponse);
  });
});