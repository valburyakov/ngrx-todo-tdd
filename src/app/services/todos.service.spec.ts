import { TestBed, inject } from '@angular/core/testing';

import { TodosService } from './todos.service';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('TodosService', () => {
  let backend: MockBackend;
  let service: TodosService;

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);

      connection.mockRespond(response);
    });
  }

  const sampleData = [
    {
      id: 1,
      title: 'Pizza',
      completed: true
    },
    {
      id: 4,
      title: 'Burrito',
      completed: false
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options), deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(inject([TodosService, MockBackend], (_service: TodosService, _backend: MockBackend ) => {
    service = _service;
    backend = _backend;
  }));

  it('should get todos', () => {
    setupConnections(backend, { body: sampleData });

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toContain('/todos/');
    });

    service.getTodos('SHOW_ALL').subscribe( todos => {
      expect(todos).toEqual(sampleData);
    });
  });

  it('should add new todo', () => {
    setupConnections(backend, { body: sampleData[0] });

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
    });

    service.addTodo('some title').subscribe(todo => {
      expect(todo).toEqual(sampleData[0])
    })
  });

  it('should update todo', () => {
    setupConnections(backend, { body: sampleData[0] });

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Put);
      expect(connection.request.url).toContain(`/todos/${sampleData[0].id}`)
    });

    service.updateTodo(sampleData[0]).subscribe(todo => {
        expect(todo).toEqual(sampleData[0])
    })
  });

  it('should delete todo', () => {
    setupConnections(backend, { body: sampleData[0] });

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Delete);
      expect(connection.request.url).toContain(`/todos/${sampleData[0].id}`)
    });

    service.deleteTodo(sampleData[0]).subscribe(todo => {
      expect(todo).toEqual(sampleData[0])
    })
  });

});
