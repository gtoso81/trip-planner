import { Test, TestingModule } from '@nestjs/testing';
import { ManageService } from './manage.service';
import { Model } from 'mongoose';
import { Trip } from './schema/trip.schema';
import { getModelToken } from '@nestjs/mongoose';
import { mockCreateDto, mockFindAllResponse, mockTripResponse } from './manage.mock';

describe('ManageService', () => {
  let service: ManageService;
  let model: Model<Trip>;

  const mockTripModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageService,
      {
        provide: getModelToken(Trip.name),
        useValue: mockTripModel,
      }]
    }).compile();

    service = module.get<ManageService>(ManageService);
    model = module.get<Model<Trip>>(getModelToken(Trip.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a trip', async () => {
    const createDto = mockCreateDto;
    mockTripModel.create.mockResolvedValue(mockTripResponse);
    const result = await service.create(createDto);
    expect(result).toEqual(mockTripResponse);
  });

  it('should list all trips', async () => {
    mockTripModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockFindAllResponse),
    });
    const result = await service.findAll();
    expect(result).toEqual(mockFindAllResponse);
  });

  it('should get a trip', async () => {
    mockTripModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTripResponse),
    });
    const result = await service.findOne('697d1ecb2ada36108b0ad534');
    expect(result).toEqual(mockTripResponse);
  });

  it('should update a trip', async () => {
    mockTripModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue({...mockTripResponse, cost:20000}),
    });
    const result = await service.update('697d1ecb2ada36108b0ad534', {cost:20000});
    expect(result).toEqual({...mockTripResponse, cost:20000});
  });

  it('should delete and return the trip', async () => {
    mockTripModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTripResponse),
    });
    const result = await service.delete('697d1ecb2ada36108b0ad534');
    expect(result).toEqual(mockTripResponse);
  });
});
