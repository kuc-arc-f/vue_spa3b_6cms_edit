<template>
    <div class="task_index_wrap">
        <FlashMessage></FlashMessage>
        <div class="row" style="margin-top: 10px;">
            <div class="col-sm-4"><h3>CmsEdit</h3>
            </div>
            <div class="col-sm-4">
                <router-link :to="'/cms_edit/new/'" class="btn btn-primary">Create
                </router-link>
            </div>
            <div class="col-sm-4" style="text-align: right;">
                <a id="download" href="" download="cms.json" class="btn btn-outline-primary btn-sm"
                v-on:click="export_task()">Export
                </a>                
                &nbsp;&nbsp;
                <a href="" v-on:click="move_action('/cms_edit/import');"
                    class="btn btn-outline-primary btn-sm">Import
                </a>                 
            </div>
        </div>
        <hr class="mt-2 mb-2" />
        <br />
        <ul v-for="item in cms_items" v-bind:key="item.id">
            <li>
                <router-link :to="'/cms_edit/show/' + item.id">{{ item.title }}</router-link>
                &nbsp;&nbsp;
                <router-link :to="'/cms_edit/edit/' + item.id"
                 class="btn btn-outline-primary btn-sm">Edit
                </router-link>                
                <br />
                ID : {{ item.id }}
                , {{ item.created_at }}
            </li>
        </ul>
        <hr />
             
    </div>
</template>

<!-- -->
<style> 
.page_info_wrap{
    background: #EEE;
    padding : 10px;
    margin-top : 20px;
}
</style>

<!-- -->
<script>
import {Mixin} from '../../mixin'
import FlashMessage from '../../components/Layouts/FlashMessage'
import Dexie from 'dexie';
import LibDexie from '@/libs/LibDexie';
import LibCmsEdit from '@/libs/LibCmsEdit';

var db = null;
//
export default {
    mixins:[Mixin],
    components: { FlashMessage },
    created () {
        var config = LibCmsEdit.get_const()
        db = new Dexie( config.DB_NAME );
        db.version( config.DB_VERSION).stores( config.DB_STORE ); 

        this.get_items()
    },
    data () {
        return {
            cms_items: [],
            items_org: [],
        }
    },
    methods: {
        get_items(){
            var self = this
            db.cms_edit.toArray().then(function (items ) {
                self.cms_items = LibDexie.get_reverse_items(items)
                //console.log( items )
            });
            db.cms_edit.toArray().then(function ( data ) {
                self.items_org = data
// console.log( self.items_org )
            });            
        },
        export_task: function(){
            var dt = new Date()
            var data = {save_date: dt, items: this.items_org, }
            var content = JSON.stringify( data  );
//console.log( dt )
            var blob = new Blob([ content ], { "type" : "application/json" });

            var fname = "cms.json"
            if (window.navigator.msSaveBlob) { 
                console.log("#-msSaveBlob")
                window.navigator.msSaveBlob(blob, fname ); 
                window.navigator.msSaveOrOpenBlob(blob, fname ); 
            } else {
                console.log("#-msSaveBlob-false")
                document.getElementById("download").href = window.URL.createObjectURL(blob);
            }            
        },
        move_action: function( action  ){
            this.set_exStorage(this.sysConst.KEY_NEXT_ACTION , action )
            window.location.href = this.sysConst.HTTP_URL
        },                
    }
}
</script>
