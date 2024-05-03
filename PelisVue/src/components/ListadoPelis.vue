<template>
        <ul v-for="item in pelis">
            <InfoPeli :info='item' :guardar='boton'/>
        </ul>
</template>

<script>
    import InfoPeli from './InfoPeli.vue';
    export default {
        name: 'ListadoPelis',
        data() {
            return {
                resultado:[]
            }
        },
        components: {
            InfoPeli,
        },
        props: ['pelis', 'boton'],
        methods: {

        },
        computed: {

        },
        mounted() {

        }
        
    }
</script>

<style lang="scss" scoped>

</style>