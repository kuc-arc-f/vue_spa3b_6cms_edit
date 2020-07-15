<template>
    <div>
        <router-link :to="'/cms_edit'" class="btn btn-outline-primary mt-2">Back
        </router-link>
        <hr class="mt-2 mb-2" />        
        <h3>title : {{ title }}</h3>
        ID : {{ id }}<br />
        date : {{ create }}
        <hr />
        <div id="post_item" v-html="content"></div>
        <hr />
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import marked from  'marked'
import Dexie from 'dexie';
import LibCommon from '@/libs/LibCommon';
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
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            id : 0,
            item: itemDat,
            tasks : [],
            title:'',
            content:'', 
            create : '',           
        }
    },
    methods: {
        async get_item(id){
            const item = await db.cms_edit.get(id);
            this.title = item.title
            this.content = marked(item.content)
//            this.content = item.content   
            // this.create = item.created_at
            this.create = LibCommon.formatDate(item.created_at, 'YYYY-MM-DD hh:mm')     
//            console.log('data: ', item) 
        },
    }
}
</script>
<!-- -->
<style>
div#post_item > p > img{
    max-width : 100%;
    height : auto;
}
div#post_item > hr {
  height: 1px;
  background-color: #000;
  border: none;
}
</style>

