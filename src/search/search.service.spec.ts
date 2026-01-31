import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { mockSearch, mockTrips, mockTripsSortedByCheapest, mockTripsSortedByFastest } from './search.mock';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('SearchService', () => {
  let service: SearchService;
  let configService: ConfigService;
  let httpService: HttpService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
          if (key === 'X_API_KEY') return 'mock-api-key';
          if (key === 'SEARCH_URL') return 'mockUrl';
          return null;
        })
  };

  const mockHttpService = {
    get: jest.fn()
  };

  const mockAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: {} } as any,
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
         {
          provide: ConfigService,
          useValue: mockConfigService
        },
        {
          provide: HttpService,
          useValue: mockHttpService
        }
      ]
    }).compile();

    service = module.get<SearchService>(SearchService);
    configService = module.get<ConfigService>(ConfigService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 200 and data', async () => {
    const trips = mockTrips;
    const search = mockSearch;

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockAxiosResponse(trips)));

    const result = await service.getTrips(search);
    expect(httpService.get).toHaveBeenCalledTimes(1);
    expect(httpService.get).toHaveBeenCalledWith("mockUrl", {"headers": {"x-api-key": "mock-api-key"}, "params": {"destination": "FRA", "origin": "MUC"}});
    expect(result).toBe(trips);
  });

  it('should return and sort correctly as fastest', async () => {
    const trips = mockTrips;
    const search = mockSearch;

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockAxiosResponse(trips)));

    const result = await service.getTrips(search);
    expect(result).toEqual(mockTripsSortedByFastest);
  });

  it('should return and sort correctly as cheapest', async () => {
    const trips = mockTrips;
    const search = mockSearch;

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockAxiosResponse(trips)));

    const result = await service.getTrips(search);
    expect(result).toEqual(mockTripsSortedByCheapest);
  });
});
