import { Test, TestingModule } from '@nestjs/testing';
import { ManageController } from './manage.controller';
import { ManageService } from './manage.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { mockCreateDto, mockFindAllResponse, mockTripResponse } from './manage.mock';

describe('ManageController', () => {
  let controller: ManageController;
   let service: ManageService;
  
    const mockManageService = {
      create: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn()
    }
  

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageController],
      providers: [
        {
          provide: ManageService,
          useValue: mockManageService
        }
      ]
    }).compile();

    controller = module.get<ManageController>(ManageController);
    service = module.get<ManageService>(ManageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should save a trip', () => {
    const createTrip: CreateTripDto = mockCreateDto;
    mockManageService.create.mockReturnValue(mockTripResponse)
    const result = controller.create(createTrip);

    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(createTrip);
    expect(service.create).toHaveReturnedWith(result);
  });

  it('should list all saved trips', () => {
    
    mockManageService.findAll.mockReturnValue(mockFindAllResponse);
    const result = controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findAll).toHaveBeenCalledWith();
    expect(service.findAll).toHaveReturnedWith(result);
  });

  it('should get a saved trip', () => {
    
    mockManageService.findOne.mockReturnValue(mockTripResponse);
    const result = controller.findOne('697d1ecb2ada36108b0ad534');

    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith('697d1ecb2ada36108b0ad534');
    expect(service.findOne).toHaveReturnedWith(result);
  });

  it('should delete a saved trip', () => {
    
    mockManageService.delete.mockReturnValue(mockTripResponse);
    const result = controller.delete('697d1ecb2ada36108b0ad534');

    expect(service.delete).toHaveBeenCalledTimes(1);
    expect(service.delete).toHaveBeenCalledWith('697d1ecb2ada36108b0ad534');
    expect(service.delete).toHaveReturnedWith(result);
  });

  it('should update a saved trip', () => {
    
    mockManageService.update.mockReturnValue({...mockTripResponse, cost:20000});
    const result = controller.update('697d1ecb2ada36108b0ad534', {cost:20000});

    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith('697d1ecb2ada36108b0ad534', {cost:20000});
    expect(service.update).toHaveReturnedWith({...mockTripResponse, cost:20000});
  });


});
