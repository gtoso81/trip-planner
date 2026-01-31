import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search-dto';
import { TripDto } from '../common/dto/trip.dto';
import { mockSearch, mockTrips } from './search.mock';

describe('SearchController', () => {
  let controller: SearchController;
  let service: SearchService;

  const mockSearchService = {
    getTrips: jest.fn()
  }

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: mockSearchService
        }
      ]
    }).compile();

    controller = module.get<SearchController>(SearchController);
    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of trips', async () => {
    const trips: TripDto[] = mockTrips;
    mockSearchService.getTrips.mockReturnValue(trips);
    const search: SearchDto = mockSearch;
    const result = controller.getTrips(search);

    expect(service.getTrips).toHaveBeenCalledTimes(1);
    expect(service.getTrips).toHaveBeenCalledWith(search);
    expect(service.getTrips).toHaveReturnedWith(result);
  });
});
