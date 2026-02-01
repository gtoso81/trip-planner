import { Test, TestingModule } from '@nestjs/testing';
import { FindAllTripsHandler } from './find-all-trips.handler';
import { FindAllTripsQuery } from '../impl/find-all-trips.query';
import { mockFindAllResponse, mockFindAllResponseDB } from '../../manage.mock';
import { TripRepository } from '../../trip.repository';

describe('FindAllTripsHandler', () => {
  let handler: FindAllTripsHandler;

  const mockTripRepository = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTripsHandler,
        {
          provide: TripRepository,
          useValue: mockTripRepository,
        },
      ],
    }).compile();

    handler = module.get<FindAllTripsHandler>(FindAllTripsHandler);
  });

  it('should return all trips', async () => {
    mockTripRepository.findAll.mockReturnValue(mockFindAllResponseDB);
    const result = await handler.execute(new FindAllTripsQuery());
    expect(result).toEqual(mockFindAllResponse);
  });
});