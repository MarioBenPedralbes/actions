<template>
    <div>
        <h1>Buscador de Películas</h1>
        <input type="text" v-model="busqueda" placeholder="Buscar una película" v-debounce="1000" @input="buscarPelis(busqueda)"/>
        <ul v-for="item in resultado">
            <InfoPeli :info='item' :guardar='true'/>
        </ul>
    </div>
</template> 

<script>
    import InfoPeli from './InfoPeli.vue';
    export default {
        name: 'BuscadorPelis',
        data() {
            return {

                resultado:[]
            }
        },
        components: {
            InfoPeli,
        },
        methods: {
            buscarPelis(busqueda){
                fetch('https://www.omdbapi.com/?apikey=4b07ea8f&s=' + busqueda)
                .then(response => response.json())
                .then(data => {
                    this.resultado = data.Search;
                    console.log(data);
                });

            }
        },
        computed: {

        },
        mounted() {

        }
        
    }
</script>

<style lang="scss" scoped>

</style>