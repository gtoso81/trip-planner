import { Test, TestingModule } from '@nestjs/testing';
import { ManageController } from './manage.controller';
import { ManageService } from './manage.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { mockCreateDto, mockFindAllResponse, mockTripResponse } from './manage.mock';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTripCommand } from './commands/impl/create-trip.command';
import { FindAllTripsQuery } from './queries/impl/find-all-trips.query';
import { FindOneTripQuery } from './queries/impl/find-one-trip.query';
import { DeleteTripCommand } from './commands/impl/delete-trip.command';
import { UpdateTripCommand } from './commands/impl/update-trip.command';

describe('ManageController', () => {
  let controller: ManageController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  
  const mockCommandBus = { 
    execute: jest.fn() 
  };
  const mockQueryBus = { 
    execute: jest.fn() 
  };

  const testIdOk = '697d1ecb2ada36108b0ad534';

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageController],
      providers: [
        {
          provide: CommandBus,
          useValue: mockCommandBus
        },
        {
          provide: QueryBus,
          useValue: mockQueryBus
        }
      ]
    }).compile();

    controller = module.get<ManageController>(ManageController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should save a trip', async () => {
    const createTrip: CreateTripDto = mockCreateDto;
    mockCommandBus.execute.mockReturnValue(mockTripResponse)
    const result = await controller.create(createTrip);

    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(CreateTripCommand)
    );
    expect(result).toEqual(mockTripResponse);
  });

  it('should list all saved trips', async () => {
    
    mockQueryBus.execute.mockResolvedValue(mockFindAllResponse);
    const result = await controller.findAll();

    expect(queryBus.execute).toHaveBeenCalledWith(
      expect.any(FindAllTripsQuery)
    );
    expect(result).toEqual(mockFindAllResponse);
  });

  it('should get a saved trip', async () => {
    
    mockQueryBus.execute.mockResolvedValue(mockTripResponse);
    const result = await controller.findOne(testIdOk);

    expect(queryBus.execute).toHaveBeenCalledWith(
      new FindOneTripQuery(testIdOk)
    );
    expect(result).toEqual(mockTripResponse);
  });

  it('should delete a saved trip', async () => {
    
    mockCommandBus.execute.mockResolvedValue(mockTripResponse);
    const result = await controller.delete(testIdOk);

    expect(mockCommandBus.execute).toHaveBeenCalledWith(
      new DeleteTripCommand(testIdOk)
    );
    expect(result).toEqual(mockTripResponse);
  });

  it('should update a saved trip', () => {
    
    mockCommandBus.execute.mockReturnValue({...mockTripResponse, cost:20000});
    const result = controller.update('697d1ecb2ada36108b0ad534', {cost:20000});

    expect(commandBus.execute).toHaveBeenCalledWith(
      new UpdateTripCommand(testIdOk, {cost:20000})
    );
    expect(result).toEqual({ ...mockTripResponse, cost: 20000 });
  });
});
