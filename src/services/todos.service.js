import { test } from '@playwright/test';

export class ToDos {
  constructor(request) {
    this.request = request;
  }

  async getTodos(token, testinfo) {
    return test.step("GET /todos", async () => {
      const response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
        headers: {
        "x-challenger": token,
      },
      });
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getTodosPositive(token, testinfo) {
    return test.step("GET /todos/{id}", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}/todos/5`, {
        headers: {
        "x-challenger": token,
      },
      });
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getTodosIdNegative(token, testinfo) {
    return test.step("GET /todos/{id}", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}/todos/15`, {
        headers: { 'X-CHALLENGER': token },
      });
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getTodosFilter(token, testinfo) {
    return test.step("GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}/todos?doneStatus=false`, {
        headers: { 'X-CHALLENGER': token },
      });
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async headTodos(token, testinfo) {
    return test.step("HEAD /todos", async () => {
    const response = await this.request.head(`${testinfo.project.use.apiURL}/todos`, {
        headers: { 'X-CHALLENGER': token },
      });
    const headers = response.headers();
    return { headers, response };
    });
  }

  async postTodos(token, testinfo, data) {
    return test.step("POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }
  async postTodosDoneStatus(token, testinfo, data) {
    return test.step("POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }
  async postTodosTitleTooLong(token, testinfo, data) {
    return test.step("POST /todos title too long", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async postTodosDescriptionTooLong(token, testinfo, data) {
    return test.step("POST /todos description too long", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async postTodosMaxOutContent(token, testinfo, data) {
    return test.step("POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async postTodosContentToolong(token, testinfo, data) {
    return test.step("POST /todos content too long", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async postTodosExtra(token, testinfo, data) {
    return test.step("POST /todos extra", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}/todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosId(token, testinfo, data) {
    return test.step("PUT /todos/{id} (400)", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}/todos/300`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const headers = response.headers();
    const body = await response.json();
    return { body, headers, response };
    });
  }

  async postTodosIdPositive(token, testinfo, data) {
    return test.step("POST /todos/{id}", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}/todos/5`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }
  async postTodosIdNegative(token, testinfo, data) {
    return test.step("POST /todos/{id}", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}/todos/200`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosIdFull(token, testinfo, data) {
    return test.step("PUT /todos/{id}", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosIdPartial(token, testinfo, data) {
    return test.step("PUT /todos/{id}", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosIdNoTitle(token, testinfo, data) {
    return test.step("PUT /todos/{id} no title (400)", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosIdNoAmendId(token, testinfo, data) {
    return test.step("PUT /todos/{id} no amend id (400)", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}/todos/3`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async deleteTodosId(token, testinfo) {
    return test.step("DELETE /todos/{id}", async () => {
    const response = await this.request.delete(`${testinfo.project.use.apiURL}/todos/1`, {
        headers: { 'X-CHALLENGER': token },
      });
      
    const headers = response.headers();
    return { response, headers };
    });
  }

  async optionsTodos(token, testinfo) {
    return test.step("OPTIONS /todos", async () => {
    const response = await this.request.fetch(`${testinfo.project.use.apiURL}/todos`, {
        headers: { 'X-CHALLENGER': token },
        method: "OPTIONS",
      });
      
    const headers = response.headers();
    return { response, headers };
    });
  }

  async getTodosXml(token, testinfo) {
    return test.step("GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
        headers: {
        accept: "application/xml",
        "x-challenger": token,
      },
      });
      
    const headers = response.headers();
    const body = await response.text();
    return { response, headers, body };
    });
  }

  async getTodosJson(token, testinfo) {
    return test.step("GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
        headers: {
        accept: "application/json",
        "x-challenger": token,
      },
      });
      
    const headers = response.headers();
    const body = await response.json();
    return { response, headers, body };
    });
  }
  async getTodosAny(token, testinfo) {
    return test.step("GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
        headers: {
        accept: "*/*",
        "x-challenger": token,
      },
      });
      
    const headers = response.headers();
    const body = await response.json();
    return { response, headers, body };
    });
  }

  async getTodosXmlPref(token, testinfo) {
    return test.step("GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
        headers: {
        accept: "application/xml, application/json",
        "x-challenger": token,
      },
      });
      
    const headers = response.headers();
    const body = await response.text();
    return { response, headers, body };
    });
  }

  async getTodosNoAccept(token, testinfo) {
    return test.step("GET /todos ", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
        headers: {
        "x-challenger": token,
      },
      });
      
    const headers = response.headers();
    const body = await response.json();
    return { response, headers, body };
    });
  }

  async getTodos406(token, testinfo) {
    return test.step("GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}/todos`, {
        headers: {
        accept: "application/gzip",
        "x-challenger": token,
      },
      });
    const headers = response.headers();
    const body = await response.json();
    return { response, headers, body };
    });
  }
}