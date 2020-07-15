//LibCmsEdit
//import LibCommon from '@/libs/LibCommon';

//
export default {
    get_const: function(){
        return {
            DB_NAME: "cms_edit_idx_kuc_db",
            DB_VERSION: 1,
            DB_STORE: {
                cms_edit: '++id, title, content , created_at',
            }
        }
    },

}
