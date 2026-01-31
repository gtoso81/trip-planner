import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { ALLOWED_IATA } from './../src/search/dto/search-dto';
import { mockCreateDto } from './../src/manage/manage.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('search controller validation rules', () => {

    const allowed = ALLOWED_IATA.join(', ');
    
    it('GET /search should fail if "origin" is missing', async() => {
      return request(app.getHttpServer())
        .get('/search')
        .query({ destination: 'FRA' })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain(`origin must be one of the following values: ${allowed}`);
        });
    });

    it('GET /search should fail if "sort_by" is an invalid enum value', async() => {
      return request(app.getHttpServer())
        .get('/search')
        .query({ 
          origin: 'NYC', 
          destination: 'LAX', 
          sort_by: 'random_string' 
        })
        .expect(400);
    });

    it('GET /search should pass if all required fields are present', async() => {
      return request(app.getHttpServer())
        .get('/search')
        .query({ origin: 'MUC', destination: 'FRA' })
        .expect((res) => {
          expect(res.status).toBe(200);
        });
    });
  });

   describe('manage controller validation rules', () => {
    let createdTripId : string;
    
    it('POST /manage should fail if body is missing props', async() => {
      return request(app.getHttpServer())
        .post('/manage')
        .send({ destination: 'AAA' })
        .expect(400);
    });

    it('POST /manage should pass if body is ok', async () => {
      const res = await request(app.getHttpServer())
        .post('/manage')
        .send(mockCreateDto)
        .expect(201);
      
        createdTripId = res.body.id;
    });

    it('GET /manage should pass if body is ok', async() => {
      return request(app.getHttpServer())
        .get('/manage')
        .expect(200);
    });

    it('GET /manage/:id should fail if id not valid', async() => {
      return request(app.getHttpServer())
        .get(`/manage/not-valid-mongo-id`)
        .expect(400);
    });

    it('GET /manage/:id should pass if id is valid and created', async() => {
      return request(app.getHttpServer())
        .get(`/manage/${createdTripId}`)
        .expect(200);
    });

    it('PUT /manage/:id should fail if id not valid', async() => {
      return request(app.getHttpServer())
        .put(`/manage/not-valid-mongo-id`)
        .send({cost:20000})
        .expect(400);
    });

    it('PUT /manage/:id should pass if id is valid and created', async() => {
      return request(app.getHttpServer())
        .put(`/manage/${createdTripId}`)
        .send({cost:20000})
        .expect(200)
        .expect((res) => {
          expect(res.body).toStrictEqual({...mockCreateDto, cost:20000, id:createdTripId})
        });
    });

     it('DELETE /manage/:id should fail if id not valid', async() => {
      return request(app.getHttpServer())
        .delete(`/manage/not-valid-mongo-id`)
        .expect(400);
    });

    it('DELETE /manage/:id should pass if id is valid and created', async() => {
      return request(app.getHttpServer())
        .delete(`/manage/${createdTripId}`)
        .expect(200);
    });

  });

  afterAll(async() => {
    await app.close();
  });
  
});
