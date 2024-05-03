<template>
    <div>
        <h1>Mis Favoritas</h1>
        <ul v-for="item in resultado">
            <InfoPeli :key=idCambio :info='item' :guardar='false' @cambio="buscarPelisFav()"/>
        </ul>
    </div>
</template> 

<script>
    import InfoPeli from './InfoPeli.vue';
    
    export default {
        name: 'PelisFavoritas',
        data() {
            return {

                resultado:[],
                idCambio:0
            }
        },
        components: {
            InfoPeli,
        },
        methods: {
            buscarPelisFav(){
                fetch('http://marbenalcdaw3.daw.inspedralbes.cat/PelisVue/back/api.php/records/pelis')
                .then(response => response.json())
                .then(data => {
                    this.resultado = data.records;
                    this.idCambio++;
                    console.log(this.resultado);
                });

            },
        },
        computed: {

        },
        mounted() {
            this.buscarPelisFav();
        }
        
    }
</script>

<style lang="scss" scoped>

</style>