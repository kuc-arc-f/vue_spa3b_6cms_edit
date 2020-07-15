<template lang="html">
    <div class="task_edit_wrap">
        <router-link :to="'/cms_edit'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />
        <h3>CmsEdit - edit</h3>        
        <div class="form-group">
            <label for="TopicTitle">Title :</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="title" v-model="title" >
            </div>
        </div>
        <div class="form-group">
            <label for="TopicContent">Content :</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="content" rows="12"
                v-model="content"></textarea>
            </div>
        </div>
        <hr />        
        <button v-on:click="update_item(id);" class="btn btn-primary mt-2">Save
        </button>
        <hr />
        <button v-on:click="delete_item(id);"
             class="btn btn-outline-danger btn-sm mt-2">Delete
        </button>
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import Dexie from 'dexie';
import LibCmsEdit from '@/libs/LibCmsEdit';

var db = null
//
export default {
    mixins:[Mixin],
    created() {
        this.id = parseInt(this.$route.params.id)
        var config = LibCmsEdit.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE );                
        this.get_item( this.id )        
    },
    data() {
        return {
            id: 0,
            tasks: [],
            title:'',
            content:'',
        }
    },
    methods: {
        async get_item(id){
            const item = await db.cms_edit.get(id);
            this.title = item.title
            this.content = item.content                     
            console.log(item);                          
        }, 
        update_item(task_id){
console.log( this.title )
//console.log( id )
            db.cms_edit.update(parseInt(task_id) , {
                title: this.title,
                content: this.content,
            });
            this.$router.push('/cms_edit')
        },        
        delete_item(id){
console.log( id )
            db.cms_edit.delete(parseInt(id) );
            this.$router.push('/cms_edit')
        },
    }
}
</script>
