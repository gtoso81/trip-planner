import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FindOneTripHandler } from './find-one-trip.handler';
import { FindOneTripQuery } from '../impl/find-one-trip.query';
import { Trip } from '../../schema/trip.schema';
import { mockTripResponse, mockTripResponseService } from '../../manage.mock';
import { NotFoundException } from '@nestjs/common';

describe('FindOneTripHandler', () => {
  let handler: FindOneTripHandler;

  const mockTripModel = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneTripHandler,
        {
          provide: getModelToken(Trip.name),
          useValue: mockTripModel,
        },
      ],
    }).compile();

    handler = module.get<FindOneTripHandler>(FindOneTripHandler);
  });

  it('should get a trip', async () => {
    mockTripModel.findById.mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTripResponseService),
      }),
    });
    const result = await handler.execute(new FindOneTripQuery('697d1ecb2ada36108b0ad534'));
    expect(result).toEqual(mockTripResponse);
  });

  it('should throw NotFoundException if trip does not exist', async () => {
      const id = 'id-not-in-db';
      mockTripModel.findById.mockReturnValue({
        lean: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
        }),
      });
  
      await expect(handler.execute(new FindOneTripQuery('id-not-in-db')))
        .rejects.toThrow(NotFoundException);
    });
});
