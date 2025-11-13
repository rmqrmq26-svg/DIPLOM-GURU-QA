import { faker } from '@faker-js/faker';

export class TodoBuilder {
    todos() {
        this.title = faker.string.alpha({ length: 2 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 5 });
        return this;
    }

    todosDoneStatus(invalidValue = "hello") {
        this.title = faker.string.alpha({ length: 3 });
        this.doneStatus = invalidValue;
        this.description = faker.string.alpha({ length: 5 });
        return this;
    }

    todosTitleTooLong() {
        this.title = faker.string.alpha({ length: 51 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 5 });
        return this;
    }

    todosDescriptionTooLong() {
        this.title = faker.string.alpha({ length: 3 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 201 });
        return this;
    }

    todosMaxOutContent() {
        this.title = faker.string.alpha({ length: 50 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 200 });
        return this;
    }

    todosContentToolong() {
        this.title = faker.string.alpha({ length: 50 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 5001 });
        return this;
    }

    todosExtra(priority) {
        this.title = faker.string.alpha({ length: 7 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 15 });
        this.priority = priority || faker.string.alpha({ length: 5 });;
        return this;
    }

    todosId() {
        this.title = faker.string.alpha({ length: 7 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 15 });
        return this;
    }

    todosIdPositive() {
        this.title = faker.string.alpha({ length: 7 });
        return this;
    }

    todosIdNegative() {
        this.title = faker.string.alpha({ length: 9 });
        return this;
    }

    todosIdFull() {
        this.title = faker.string.alpha({ length: 7 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 15 });
        return this;
    }
    
    todosIdPartial() {
        this.title = faker.string.alpha({ length: 7 });
        return this;
    }

    todosIdNoTitle() {
        this.description = faker.string.alpha({ length: 15 });
        return this;
    }

    todosIdNoAmendId(id) {
        this.id = id;
        this.title = id || faker.number.int({ min: 1, max: 10 });
        return this;
    }

    generate() {
        return { ...this };
    }
}