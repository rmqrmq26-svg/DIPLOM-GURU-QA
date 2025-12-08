import { test } from '@playwright/test';

export class ToDo {
  constructor(request) {
    this.request = request;
  }

  async getTodoNotPlural(token, testinfo) {
    return test.step("/GET /todo", async () => {
      const response = await this.request.get(`${testinfo.project.use.apiURL}/todo`, {
        headers: {
        "x-challenger": token,
      },
      });
  
    return response;
    });
  }
}