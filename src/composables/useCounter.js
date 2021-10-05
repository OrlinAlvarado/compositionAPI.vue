import { ref } from 'vue';

const userCounter = ( initValue = 5) => {
    const counter = ref(initValue)
    
    return {
      counter,
      
      decrease: () => counter.value--,
      increase: () =>  counter.value++,
    }
}

export default userCounter