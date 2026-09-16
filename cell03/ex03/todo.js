const COOKIE_NAME = "ft_todos";
const COOKIE_DAYS = 365;

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

function loadTodos() {
    const raw = getCookie(COOKIE_NAME);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

function saveTodos(todos) {
    setCookie(COOKIE_NAME, JSON.stringify(todos), COOKIE_DAYS);
}

let todos = loadTodos();

const ftList = document.getElementById("ft_list");
const ftNew = document.getElementById("ft_new");

function createTodoElement(todo) {
    const div = document.createElement("div");
    div.className = "todo-item";
    div.textContent = todo.text;
    div.dataset.id = todo.id;
    div.addEventListener("click", () => {
        const confirmed = confirm("Remove this to-do item?");
        if (confirmed) {
            removeTodo(todo.id);
        }
    });
    return div;
}

function removeTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos(todos);
    const el = ftList.querySelector(`[data-id="${id}"]`);
    if (el) el.remove();
}

function addTodo(text) {
    const todo = { id: Date.now(), text };
    todos.unshift(todo);
    saveTodos(todos);
    ftList.prepend(createTodoElement(todo));
}

function renderAll() {
    ftList.innerHTML = "";
    todos.forEach((todo) => ftList.appendChild(createTodoElement(todo)));
}

ftNew.addEventListener("click", () => {
    const text = prompt("New to-do:");
    if (text !== null && text.trim() !== "") {
        addTodo(text.trim());
    }
});

renderAll();
