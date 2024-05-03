<template>
    <div>
        <h2>{{ info.Title }}</h2>
        <img width="100px" height="165px" :src=info.Poster alt="Poster de {{ info.Title }}">
        <div class="bloque__guardar" v-if="guardar==true">
            <button class="guardar__boton"  @click="guardar(info)">Guardar</button>
        </div>
        <div class="bloque__borrar" v-else>
            <span @click="sumar(info, true)">&#x1F592;</span>
            <span>{{ info.Likes }}</span>
            <span @click="sumar(info, false)">&#x1F593;</span>
            <span>{{ info.Dislikes }}</span>
            <button class="borrar__boton"  @click="borrar(info.id)">Borrar</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfoPeli',
    data() {
        return {
            resultado:[]
        }
    },
    components: {
    },
    props: ['info', 'guardar'],
    methods: {
        guardar(peli) {
            /*poner llamada a la api propia para guardar con PUT
            http://marbenalcdaw3.daw.inspedralbes.cat/PelisVue/back/api.php/records/pelis
            
            const peli ={
                Title: info.Title,
                Year: info.Year,
                imdbID: info.imdbID,
                Type: info.Type,
                Poster: info.Poster
            };*/
            const response = fetch(`http://marbenalcdaw3.daw.inspedralbes.cat/PelisVue/back/api.php/records/pelis`, {
                method: "POST",
                body:JSON.stringify(peli)
            });
            console.log(peli);
            this.repintar();

        },
        sumar(peli, like) {
            /*poner llamada a la api propia para guardar con PUT
            http://marbenalcdaw3.daw.inspedralbes.cat/PelisVue/back/api.php/records/pelis
            */
           if (like==true) {
                const cambio = {
                    Likes: peli.Likes+1
                };
                const response = fetch(`http://marbenalcdaw3.daw.inspedralbes.cat/PelisVue/back/api.php/records/pelis/${peli.id}`, {
                    method: "PUT",
                    body: JSON.stringify(cambio)
                });
                console.log(cambio);

            } else {
                const cambio = {
                    Dislikes: peli.Dislikes+1
                };
                const response = fetch(`http://marbenalcdaw3.daw.inspedralbes.cat/PelisVue/back/api.php/records/pelis/${peli.id}`, {
                    method: "PUT",
                    body: JSON.stringify(cambio)
                });
                console.log(cambio);
            }
            this.repintar();

        },

        borrar(peli) {
            /*poner llamada a la api propia para borrar con DELETE
            http://marbenalcdaw3.daw.inspedralbes.cat/PelisVue/back/api.php/records/pelis/+id+
            */
            const response = fetch(`http://marbenalcdaw3.daw.inspedralbes.cat/PelisVue/back/api.php/records/pelis/${peli}`, {
                method: "DELETE"
            });
            console.log(`${peli} borrada`);
            this.repintar();
        },

        repintar() {
            this.$emit('cambio')
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