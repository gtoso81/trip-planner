import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTripHandler } from './update-trip.handler';
import { UpdateTripCommand } from '../impl/update-trip.command';
import { NotFoundException } from '@nestjs/common';
import { mockTripResponse, mockTripResponseDB } from '../../manage.mock';
import { TripRepository } from '../../trip.repository';

describe('UpdateTripHandler', () => {
  let handler: UpdateTripHandler;

  const mockTripRepository = {
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTripHandler,
       {
          provide: TripRepository,
          useValue: mockTripRepository,
        },
      ],
    }).compile();

    handler = module.get<UpdateTripHandler>(UpdateTripHandler);
  });

  it('should update and return a trip', async () => {
    mockTripRepository.update.mockResolvedValue({ ...mockTripResponseDB, cost: 20000 });
    const result = await handler.execute(new UpdateTripCommand('697d1ecb2ada36108b0ad534', { cost: 20000 }));
    expect(result).toEqual({ ...mockTripResponse, cost: 20000 });
  });

  it('should throw NotFoundException if trip does not exist', async () => {
    mockTripRepository.update.mockResolvedValue(null);
    await expect(handler.execute(new UpdateTripCommand('id-not-in-db', { cost: 10 }))).rejects.toThrow(NotFoundException);
  });
});