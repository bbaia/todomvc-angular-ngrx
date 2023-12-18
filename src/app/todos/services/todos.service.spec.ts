import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';

describe('Service: TodosService', () => {
  let service: TodosService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TodosService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const data = [
    {
      id: 0.234567891,
      text: 'Learn Angular',
      creationDate: '2020-02-01',
      completed: true,
    },
    {
      id: 0.345678912,
      text: 'Learn Jest',
      creationDate: '2020-03-01',
      completed: false,
    },
  ];

  const todos = [
    {
      id: 0.234567891,
      text: 'Learn Angular',
      creationDate: new Date('2020-02-01'),
      completed: true,
    },
    {
      id: 0.345678912,
      text: 'Learn Jest',
      creationDate: new Date('2020-03-01'),
      completed: false,
    },
  ];

  it('should call todos api and transform results', done => {
    service.getTodos().subscribe(response => {
      expect(response).toEqual(todos);
      done();
    });
    const req = httpTestingController.expectOne('assets/todos.json');
    req.flush(data);
  });
});
