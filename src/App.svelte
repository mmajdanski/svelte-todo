<script>
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardTitle,
    Container,
    Row,
    Col,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";
  import { todos } from "./stores.js";

  function addTodo(todo_text) {
    if (todo_text === "") {
      isInvalidInput = true;
      return;
    }
    let id;
    if ($todos.length > 0) {
      id = $todos[$todos.length - 1].id + 1;
    } else {
      id = 1;
    }
    $todos = [
      ...$todos,
      {
        id: id,
        text: todo_text,
        completed: false,
      },
    ];

    newTodoText = "";
  }

  const colors = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];

  function completeTodo(index) {
    $todos[index].completed = !$todos[index].completed;
  }

  function deleteCompleted() {
    $todos = $todos.filter((todo) => !todo.completed);
  }

  function editTodoText(todo, index) {
    //Open up a modal
    //Have the current text in an input field
    //Ok button saves the updated changes, close does nothing
    toggle();
    editingTodo = todo;
    editingTodoIndex = index;
  }

  function updateTodoText() {
    if (editTodo_text != "") {
      $todos[editingTodoIndex].text = editTodo_text;
      toggle();
      editTodo_text = "";
    }
  }

  function checkEnter(e) {
    if (e.key === "Enter") {
      addTodo(newTodoText);
    }
  }

  function checkEditEnter(e) {
    if (e.key === "Enter") {
      if (editTodo_text != "") {
        updateTodoText(editingTodoIndex, editTodo_text);
      }
    }
  }

  /* Variables */
  let newTodoText = "";
  let editingTodo = {};
  let editTodo_text = "";
  let editingTodoIndex;

  $: completedTodos = $todos.filter((todo) => todo.completed);
  $: isInvalidInput = newTodoText === "" ? true : false;
  $: isInvalidInputEdit = editTodo_text === "" ? true : false;

  let open = false;
  const toggle = () => (open = !open);
</script>

<Container>
  <Row>
    <Col sm="12" md={{ size: 6, offset: 3 }}>
      <Card class="mb-3">
        <CardHeader>
          <CardTitle>To-Do List App</CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle>Add todo</CardSubtitle>

          <Input
            plaintext
            bind:value={newTodoText}
            invalid={isInvalidInput}
            feedback="Please enter in a valid input"
            placeholder="Add your todo here"
            on:keypress={checkEnter}
          />

          <Button class="add-button" on:click={() => addTodo(newTodoText)}>Add</Button>
          <Container fluid>
            {#each $todos as todo, index}
              <Row style="align-items: center">
                <Col class="col-lg-10">
                  <Card class="todo-item {todo.completed ? 'crossed-out-faded' : ''}" on:click={() => completeTodo(index)}>
                    <CardBody style="display: flex">
                      {todo.text}
                    </CardBody>
                  </Card>
                </Col>
                <Col class="col-lg-2">
                  <Button class="edit-button" on:click={() => editTodoText(todo, index)}>Edit</Button>
                </Col>
              </Row>
            {/each}
          </Container>
          <Modal isOpen={open} {toggle}>
            <ModalHeader {toggle}>Editing: {editingTodo.text}</ModalHeader>
            <ModalBody>
              <Input
                plaintext
                bind:value={editTodo_text}
                invalid={isInvalidInputEdit}
                feedback="Please enter in a valid input"
                placeholder={editingTodo.text}
                on:keypress={(e) => checkEditEnter(e)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" on:click={() => updateTodoText()}>Update</Button>
              <Button color="secondary" on:click={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
          {#if completedTodos.length > 0}
            <Button class="delete-button" on:click={() => deleteCompleted()}>Delete Completed?</Button>
          {/if}
        </CardBody>
        <CardFooter>Made with &lt;3 by Michael Majdanski</CardFooter>
      </Card>
    </Col>
  </Row>
</Container>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
</svelte:head>

<style>
  :global(.todo-item) {
    margin-top: 5px;
  }

  :global(.delete-button) {
    margin-top: 10px;
    background-color: palevioletred !important;
  }

  :global(.add-button) {
    margin-top: 5px;
    background-color: teal !important;
    opacity: 0.8;
  }

  :global(.edit-button) {
    background-color: mediumpurple !important;
    opacity: 0.9;
  }

  :global(.crossed-out-faded) {
    text-decoration: line-through !important;
    opacity: 0.5;
    background-color: teal !important;
    color: white;
  }
</style>
