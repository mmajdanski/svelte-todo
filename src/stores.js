import { writable } from 'svelte/store';

export const todos = writable([
    {
        id: 1,
        text: "This is my first todo",
        completed: false,
    }
]);