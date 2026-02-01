import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { mockTripResponse, mockTripResponseDB } from '../../manage.mock';
import { DeleteTripHandler } from './delete-trip.handler';
import { DeleteTripCommand } from '../impl/delete-trip.command';
import { TripRepository } from '../../trip.repository';

describe('DeleteTripHandler', () => {
  let handler: DeleteTripHandler;

  const mockTripRepository = {
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTripHandler,
         {
          provide: TripRepository,
          useValue: mockTripRepository,
        },
      ],
    }).compile();

    handler = module.get<DeleteTripHandler>(DeleteTripHandler);
  });

  it('should delete and return a trip', async () => {
    mockTripRepository.delete.mockReturnValue(mockTripResponseDB);
    const result = await handler.execute(new DeleteTripCommand('697d1ecb2ada36108b0ad534'));
    expect(result).toEqual(mockTripResponse);
  });

  it('should throw NotFoundException if trip does not exist', async () => {
    mockTripRepository.delete.mockReturnValue(null);
    await expect(handler.execute(new DeleteTripCommand('id-not-in-db'))).rejects.toThrow(NotFoundException);
  });
});