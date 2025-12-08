import { expect } from "@playwright/test";
import { TodoBuilder } from "../src/helpers/builders/index"
import { test } from "../src/fixtures/index"

let token;
test.describe("POST /challenger @api", () => {
  test.beforeAll(async ({ api }, testinfo) => {
    let response = await api.challenger.post(testinfo);
    const headers = response.headers();
    token = headers["x-challenger"];
  });

  test("GET /challenges @api", async ({ api }, testinfo) => {
  let result = await api.challenges.getChallenges(token, testinfo);
  
  expect(result.response.status()).toBe(200);
  expect(result.headers["x-challenger"]).toBe(token);
  expect(result.body.challenges.length).toBe(59);
});

  test("GET /todos @api", async ({ api }, testinfo) => {
    let result = await api.todos.getTodos(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.todos.length).toBe(10);
  });

  test("GET /todo not plural @api", async ({ api }, testinfo) => {
    let response = await api.todo.getTodoNotPlural(token, testinfo);
    expect(response.status()).toBe(404);
  });

  test("GET /todos/{id} @api", async ({ api }, testinfo) => {
    let result = await api.todos.getTodosPositive(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.todos.length).toBe(1);
    expect(result.body.todos[0].title).toBe("pay invoices");
    expect(result.body.todos[0].doneStatus).toBe(false);
    expect(result.body.todos[0].description).toBe('');
  });

  test("GET /todos/{id}  @api", async ({ api }, testinfo) => {
    let result = await api.todos.getTodosIdNegative(token, testinfo);
    expect(result.response.status()).toBe(404);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain(
      "Could not find an instance with todos"
    );
  });

  test("GET /todos ?filter @api", async ({ api }, testinfo) => {
    let result = await api.todos.getTodosFilter(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.todos[0].doneStatus).toBe(false);
  });

  test("HEAD /todos @api", async ({ api }, testinfo) => {
    let result = await api.todos.headTodos(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("POST /todos @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todos()
        .generate();
    let result = await api.todos.postTodos(token, testinfo, todo);
    expect(result.response.status()).toBe(201);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.doneStatus).toEqual(todo.doneStatus);
    expect(result.body.title).toBe(todo.title);
    expect(result.body.description).toBe(todo.description);
  });

  test("POST /todos doneStatus @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosDoneStatus()
        .generate();
    let result = await api.todos.postTodosDoneStatus(token, testinfo, todo);
    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain(
      "Failed Validation: doneStatus should be BOOLEAN"
    );
  });

  test("POST /todos title too long @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosTitleTooLong()
        .generate();
    let result = await api.todos.postTodosTitleTooLong(token, testinfo, todo);
    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain(
      "Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50"
    );
  });

  test("POST /todos description too long @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosDescriptionTooLong()
        .generate();
    let result = await api.todos.postTodosDescriptionTooLong(token, testinfo, todo);
    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain(
      "Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200"
    );
  });

  test("POST /todos max out content @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosMaxOutContent()
        .generate();
    let result = await api.todos.postTodosMaxOutContent(token, testinfo, todo);
    expect(result.response.status()).toBe(201);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.doneStatus).toEqual(todo.doneStatus);
    expect(result.body.title).toBe(todo.title);
    expect(result.body.description).toBe(todo.description);
  });

  test("POST /todos content too long @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosContentToolong()
        .generate();
    let result = await api.todos.postTodosContentToolong(token, testinfo, todo);
    expect(result.response.status()).toBe(413);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain(
      "Request body too large, max allowed is 5000 bytes"
    );
  });
//
  test("POST /todos extra @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosExtra()
        .generate();
    let result = await api.todos.postTodosExtra(token, testinfo, todo);
    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain("Could not find field: priority");
  });

  test("PUT /todos/{id} @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosId()
        .generate();
    let result = await api.todos.putTodosId(token, testinfo, todo);
    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain(
      "Cannot create todo with PUT due to Auto fields id"
    );
  });

  test("POST /todos/{id} @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdPositive()
        .generate();
    let result = await api.todos.postTodosIdPositive(token, testinfo, todo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.title).toBe(todo.title);
  });

  test("POST /todos/{id} ok @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdNegative()
        .generate();
    let result = await api.todos.postTodosIdNegative(token, testinfo, todo);
    expect(result.response.status()).toBe(404);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain(
      "No such todo entity instance with id == 200 found"
    );
  });

  test("PUT /todos/{id} full @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdFull()
        .generate();
    let result = await api.todos.putTodosIdFull(token, testinfo, todo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.id).toBe(3);
    expect(result.body.title).toBe(todo.title);
    expect(result.body.description).toBe(todo.description);
    expect(result.body.doneStatus).toBe(todo.doneStatus);
  });

  test("PUT /todos/{id} partial @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdPartial()
        .generate();
    let result = await api.todos.putTodosIdFull(token, testinfo, todo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.id).toBe(3);
    expect(result.body.title).toBe(todo.title);
    expect(result.body.description).toBe("");
    expect(result.body.doneStatus).toBe(false);
  });

  test("PUT /todos/{id} no title @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdNoTitle()
        .generate();
    let result = await api.todos.putTodosIdNoTitle(token, testinfo, todo);
    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain("title : field is mandatory");
  });

  test("PUT /todos/{id} no amend id @api", async ({ api, }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdNoAmendId(4)
        .generate();
    let result = await api.todos.putTodosIdNoAmendId(token, testinfo, todo);
    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.errorMessages[0]).toContain("Can not amend id from 3 to 4");
  });

  test("DELETE /todos/{id} @api", async ({ api, }, testinfo) => {
    let result = await api.todos.deleteTodosId(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("OPTIONS /todos @api", async ({ api, }, testinfo) => {
    let result = await api.todos.optionsTodos(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["allow"]).toContain("OPTIONS");
    expect(result.headers["allow"]).toContain("GET");
    expect(result.headers["allow"]).toContain("POST");
    expect(result.headers["allow"]).toContain("HEAD");
    expect(result.headers["allow"]).not.toContain("PUT");
    expect(result.headers["allow"]).not.toContain("DELETE");
    expect(result.headers["allow"]).not.toContain("PATCH");
  });

  test("GET /todos XML @api", async ({ api, }, testinfo) => {
    let result = await api.todos.getTodosXml(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers["content-type"]).toContain("application/xml");
    expect(result.body.trim().startsWith("<")).toBe(true);
  });

  test("GET /todos JSON @api", async ({ api, }, testinfo) => {
    let result = await api.todos.getTodosJson(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers["content-type"]).toContain("application/json");
    expect(typeof result.body === "object").toBe(true);
  });

  test("GET /todos ANY @api", async ({ api, }, testinfo) => {
    let result = await api.todos.getTodosAny(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers["content-type"]).toContain("application/json");
    expect(typeof result.body === "object").toBe(true);
  });

  test("GET /todos XML pref @api", async ({ api, }, testinfo) => {
    let result = await api.todos.getTodosXmlPref(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers["content-type"]).toContain("application/xml");
    expect(result.body.trim().startsWith("<")).toBe(true);
  });

  test("GET /todos no accept @api", async ({ api, }, testinfo) => {
    let result = await api.todos.getTodosNoAccept(token, testinfo);
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers["content-type"]).toContain("application/json");
    expect(typeof result.body === "object").toBe(true);
  });

  test("GET /todos Unrecognised @api", async ({ api, }, testinfo) => {
    let result = await api.todos.getTodos406(token, testinfo);
    expect(result.response.status()).toBe(406);
    expect(result.body.errorMessages).toContain("Unrecognised Accept Type");
  });
});