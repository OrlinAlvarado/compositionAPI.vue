<template>
    <h1>Buscar Pokemón: {{ pokemonId }}</h1>
    <form @submit.prevent="onSubmit">
        <input 
            type="number"
            placeholder="Número del pokemón"
            v-model="pokemonId"
            ref="txtSearchId"
        />
        <span>Presione enter para buscar</span>
    </form>
</template>

<script>
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
export default {
    
    setup(){
        const router = useRouter()
        const pokemonId = ref(1)
        const txtSearchId = ref()
        
        onActivated(() => {
            txtSearchId.value.select()
        })
        
        return{
            pokemonId,
            txtSearchId,
            
            onSubmit: () => {
                console.log('pokemon a buscar: ', pokemonId.value )
                router.push({
                    name: 'pokemon-id',
                    params: {
                        id: pokemonId.value 
                    }
                })
            }
        }
    }

}
</script>

