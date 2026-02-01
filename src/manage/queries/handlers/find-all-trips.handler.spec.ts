import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FindAllTripsHandler } from './find-all-trips.handler';
import { FindAllTripsQuery } from '../impl/find-all-trips.query';
import { Trip } from '../../schema/trip.schema';
import { mockFindAllResponse, mockFindAllResponseService } from '../../manage.mock';

describe('FindAllTripsHandler', () => {
  let handler: FindAllTripsHandler;

  const mockTripModel = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllTripsHandler,
        {
          provide: getModelToken(Trip.name),
          useValue: mockTripModel,
        },
      ],
    }).compile();

    handler = module.get<FindAllTripsHandler>(FindAllTripsHandler);
  });

  it('should return all trips', async () => {
    mockTripModel.find.mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockFindAllResponseService),
      }),
    });
    const result = await handler.execute(new FindAllTripsQuery());
    expect(result).toEqual(mockFindAllResponse);
    expect(mockTripModel.find).toHaveBeenCalled();
  });
});