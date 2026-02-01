import { Test, TestingModule } from '@nestjs/testing';
import { FindOneTripHandler } from './find-one-trip.handler';
import { FindOneTripQuery } from '../impl/find-one-trip.query';
import { mockTripResponse, mockTripResponseDB } from '../../manage.mock';
import { NotFoundException } from '@nestjs/common';
import { TripRepository } from '../../trip.repository';

describe('FindOneTripHandler', () => {
  let handler: FindOneTripHandler;

  const mockTripRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneTripHandler,
        {
            provide: TripRepository,
            useValue: mockTripRepository,
        },
      ],
    }).compile();

    handler = module.get<FindOneTripHandler>(FindOneTripHandler);
  });

  it('should get a trip', async () => {
    mockTripRepository.findById.mockReturnValue(mockTripResponseDB);
    const result = await handler.execute(new FindOneTripQuery('697d1ecb2ada36108b0ad534'));
    expect(result).toEqual(mockTripResponse);
  });

  it('should throw NotFoundException if trip does not exist', async () => {
     mockTripRepository.findById.mockReturnValue(null);
      await expect(handler.execute(new FindOneTripQuery('id-not-in-db'))).rejects.toThrow(NotFoundException);
    });
});
