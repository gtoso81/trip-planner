import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UpdateTripHandler } from './update-trip.handler';
import { UpdateTripCommand } from '../impl/update-trip.command';
import { Trip } from '../../schema/trip.schema';
import { NotFoundException } from '@nestjs/common';
import { mockTripResponse, mockTripResponseService } from '../../manage.mock';

describe('UpdateTripHandler', () => {
  let handler: UpdateTripHandler;

  const mockTripModel = {
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTripHandler,
        {
          provide: getModelToken(Trip.name),
          useValue: mockTripModel,
        },
      ],
    }).compile();

    handler = module.get<UpdateTripHandler>(UpdateTripHandler);
  });

  it('should update and return a trip', async () => {

    mockTripModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue({ ...mockTripResponseService, cost: 20000 }),
    });
    const result = await handler.execute(new UpdateTripCommand('697d1ecb2ada36108b0ad534', { cost: 20000 }));
    expect(result).toEqual({ ...mockTripResponse, cost: 20000 });
  });

  it('should throw NotFoundException if trip does not exist', async () => {
    const id = 'id-not-in-db';
    mockTripModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(handler.execute(new UpdateTripCommand(id, { cost: 10 }))).rejects.toThrow(NotFoundException);
  });
});