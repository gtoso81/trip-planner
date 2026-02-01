import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Trip } from '../../schema/trip.schema';
import { NotFoundException } from '@nestjs/common';
import { mockTripResponse, mockTripResponseService } from '../../manage.mock';
import { DeleteTripHandler } from './delete-trip.handler';
import { DeleteTripCommand } from '../impl/delete-trip.command';

describe('DeleteTripHandler', () => {
  let handler: DeleteTripHandler;

  const mockTripModel = {
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTripHandler,
        {
          provide: getModelToken(Trip.name),
          useValue: mockTripModel,
        },
      ],
    }).compile();

    handler = module.get<DeleteTripHandler>(DeleteTripHandler);
  });

  it('should delete and return a trip', async () => {
    mockTripModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTripResponseService),
    });
    const result = await handler.execute(new DeleteTripCommand('697d1ecb2ada36108b0ad534'));
    expect(result).toEqual(mockTripResponse);
  });

  it('should throw NotFoundException if trip does not exist', async () => {
    mockTripModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });
    await expect(handler.execute(new DeleteTripCommand('id-not-in-db'))).rejects.toThrow(NotFoundException);
  });
});