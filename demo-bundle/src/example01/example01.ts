import {Todo} from "../models/todo";
import example01 from './example01.scss'

export class Example01 {

    static styles = [
        example01
    ];

    todos: Todo[] = [];
    nextId = 1;

    taskInput = document.getElementById("taskInput") as HTMLInputElement;
    addBtn = document.getElementById("addBtn") as HTMLButtonElement;
    todoList = document.getElementById("todoList") as HTMLUListElement;

    constructor() {
        this.addBtn.addEventListener("click", () => {
            const task = this.taskInput.value.trim();
            if (task !== "") {
                this.addTodo(task);
                this.taskInput.value = "";
            }
        });
    }

    addTodo(task: string): void {
        const todo = {
            id: this.nextId++,
            task: task,
            done: false,
        };
        this.todos.push(<Todo>todo);
        this.renderTodos();
    }

    toggleTodo(id: number): void {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.done = !todo.done;
            this.renderTodos();
        }
    }

    renderTodos(): void {
        this.todoList.innerHTML = "";
        this.todos.forEach(todo => {
            const li = document.createElement("li");
            li.textContent = todo.task;
            li.style.textDecoration = todo.done ? "line-through" : "none";
            li.style.cursor = "pointer";
            li.addEventListener("click", () => this.toggleTodo(todo.id));
            this.todoList.appendChild(li);
        });
    }

}