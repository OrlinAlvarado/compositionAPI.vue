<template>
  <h1>Lista de tareas de Thanos</h1>
  <!-- <h4>Pendientes: {{ $store.state.todos.length }}</h4> -->
  <h4>Pendientes: {{ pending.length }}</h4>
  
  <hr>
  
  <button 
    :class="{ 'active': currentTab === 'all' }"
    @click="currentTab='all'"
  >
    Todos
  </button>
  <button 
    :class="{ 'active': currentTab === 'pending' }"
    @click="currentTab='pending'"
  >
    Pendientes
  </button>
  <button 
    :class="{ 'active': currentTab === 'completed' }"
    @click="currentTab='completed'"
  >
    Completados
  </button>
  
  <div>
    <ul>
      <li v-for="todo in getTodosByTab" :key="todo.id"
        :class="{ 'completed': todo.completed }"
        @dblclick="toggleTodo( todo.id )"
      >
        {{ todo.text }}
      </li>
    </ul>
  </div>
  
  <button @click="openModal">Cear Todo</button>
  
  <!-- Modal -->
  <!-- 
    Formulario
      submit.prevent
   -->
   <modal 
    v-if="isOpen"
    title="Hola mundo"
    otherTitle="Test"
    @on:close="closeModal"
    >
      <template v-slot:header >
          <h4>Crear nuevo todo</h4>
      </template>
      
      <template v-slot:body >
          <form @submit.prevent="onSubmit">
              <input 
                type="text" 
                v-model="todo"
                placeholder="Ingrese tarea" 
              />
            <br>
            <br>            
            <button type="submit">Guardar</button>
          </form>
      </template>
  </modal>
</template>

<script>
import { ref } from 'vue'
import useTodos from '../composables/useTodos'
import Modal from '../components/Modal.vue'
export default {
  components: { Modal },
  setup(){
    const isOpen = ref(false)
    const todo = ref()
    const {
      currentTab,
      pending,
      getTodosByTab,
      toggleTodo,
      addTodo
    } = useTodos()
    
    const onSubmit = () => {
      addTodo(todo.value)
      todo.value = ''
      isOpen.value = false;
    }
   
    return {
      currentTab,
      pending,
      getTodosByTab,
      toggleTodo,
      todo,
      isOpen,
      
      openModal: () => isOpen.value = true,
      closeModal: () => isOpen.value = false,
      onSubmit,
      
    }
  }
}
</script>

<style scoped>
div{
  display: flex;
  justify-content: center;
  text-align: center;
}

ul{
  width: 300px;
  text-align: left;
}

li{
  cursor: pointer;
}

.active{
  background-color: #2c3e50;
  color: white;
}

.completed{
  text-decoration: line-through;
}
</style>