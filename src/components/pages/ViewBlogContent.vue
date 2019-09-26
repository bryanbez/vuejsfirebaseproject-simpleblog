<template>
    <div>
       <div class="jumbotron pt-5">
           <div class="container">
               <div class="row">
                   <div class="col-sm-12 col-md-9 col-lg-9">
                           <div class="card mb-3">
                            <img class="card-img-top img-fluid" v-bind:src="imageLink" style="max-height: 30em;">
                            <div class="card-body">
                                <h4 class="card-title text-uppercase font-weight-bold">{{ title }}</h4>
                                <p class="card-text"><small class="text-muted">Updated at: {{ created_at }}</small></p>
                                <div class="card-text" v-html="previewText">
                                    
                                </div>                      
                            </div>
                            <div class="card-footer">
                                <a @click="backToHomepage" class="btn btn-primary text-white">Back</a>
                            </div>
                        </div>
                   </div>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
import firebasePlugin from '../firebaseInit.js'
let marked = require('marked');

export default {
    data() {
        return {
          
            blog_id: '',
            title: '',
            content: '',
            created_at: '',
            image_full: '',
            imageLink: ''
        }
    },
    beforeRouteEnter(to, from, next) {
        firebasePlugin.firestore().collection('blog_content').where('blog_id', '==', to.params.blog_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.blog_id = doc.data().blog_id,
                    vm.title = doc.data().title,
                    vm.content = doc.data().content,
                    vm.created_at = doc.data().created_at,
                    vm.image_full = doc.data().image_full

                    firebasePlugin.storage().ref().child('blog_feature_image/'+doc.data().image_full).getDownloadURL().then(function(url) {
                        vm.imageLink = url;
                        console.log(url);
                    }); 
                 
                })
            })
        })
    },
    watch: {
     '$route': 'fetchSpecificData'
    },
    computed: {
       previewText() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
        return marked(this.content)
        }
    },
    methods: {
        fetchSpecificData() {
            firebasePlugin.firestore().collection('blog_content').where('blog_id', '==', this.$route.params.blog_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                   
                    this.blog_id = doc.data().blog_id,
                    this.title = doc.data().title,
                    this.content = doc.data().content,
                    this.created_at = doc.data().created_at,
                    this.image_full = doc.data().image_full

                    firebasePlugin.storage().ref().child('blog_feature_image/'+this.image_full).getDownloadURL().then(function(url) {
                        this.imageLink = url;
                        console.log(this.imageLink);
                    }); 
                })
            })
        
         },
         backToHomepage() {
             return this.$router.push('/');
         }
    },

   
}
</script>

<style scoped>
  .card {
      height: auto;
      width: 100%;
  }
</style>