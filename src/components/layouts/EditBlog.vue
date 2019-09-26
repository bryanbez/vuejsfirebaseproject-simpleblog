<template>
  <div class="container">
      <div class="row pb-3 pt-3">
          <h3>Edit Blog Post</h3>

      </div>
      <form @submit.prevent="addBlogPost">
          <div class="row pb-3">
              <label for="">Blog Title</label>
              <input type="text" class="form-control" v-model="title">
          </div>
          <div class="row pb-3">
              <label for="">Content</label>
              <br />
              <div class="container">
                     <vue-simplemde v-model="content" preview-class="markdown-body" ref="markdownEditor" />
              </div>
          </div>
            <div class="row pb-3">
              <label for="">Featured Image</label>
              <input type="file" class="form-control" multiple accept="image/jpg,image/jpeg,/image/png" v-on:change="uploadFeaturedImage">

               <div class="image-preview" v-if="featuredImage.length > 0">
                  <label for="">Preview Image</label>
                  <img class="preview" :src="featuredImage">
              </div>
          </div>
          <div class="row pb-3 pt-3">
            <button type="submit" class="btn btn-primary mr-3">Add Blog</button>
            <button class="btn btn-secondary">Back</button>
          </div>
      </form>

  </div>
</template>

<script>
import firebasePlugin from '../firebaseInit.js'
import VueSimplemde from 'vue-simplemde'
let marked = require('marked');

export default {
    data() {
        return {

            blog_id: '',
            title: '',
            content: '',
            featuredImage: '',
            image_full: '',
            imageLink: ''
            updateDate: new Date().toJSON().slice(0,10).replace(/-/g,'-')
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
      uploadFeaturedImage(event) {
          var fileInput = event.target;
          this.fileName = event.target.files[0].name;
          console.log(this.fileName);

          if(fileInput.files && fileInput.files[0]) {
              var readerImg = new FileReader();
              readerImg.onload = (e) => {
                  this.featuredImage = e.target.result;
                  this.uploadFile = event.target.files[0];
              }
              readerImg.readAsDataURL(fileInput.files[0]);
          }
        },

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
         uploadFeaturedImage(event) {
             var fileInput = event.target;
             this.fileName = event.target.files[0].name;
             console.log(this.fileName);

             if(fileInput.files && fileInput.files[0]) {
                 var readerImg = new FileReader();
                 readerImg.onload = (e) => {
                     this.featuredImage = e.target.result;
                     this.uploadFile = event.target.files[0];
                 }
                 readerImg.readAsDataURL(fileInput.files[0]);
             }

         },
         updateBlogPost() {

             var storageRef = firebasePlugin.storage().ref('blog_feature_image/'+this.fileName);
                 storageRef.put(this.uploadFile).then(function(snapshot) {
                     console.log('Uploaded a blob or file!');
                 });

             firebasePlugin.firestore().collection('blog_content').add({
                 title: this.title,
                 content: this.content,
                 created_at: this.fullDate,
                 image_full: this.fileName,
                 updated_at: ''
             }).then(docRef => this.$router.push('/'))
               .catch(insertError => console.log(insertError));
         }
         backToHomepage() {
             return this.$router.push('/');
         }
    },
    components: {
        VueSimplemde
    },


}
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';
@import '~github-markdown-css';
  .card {
      height: auto;
      width: 100%;
  }
</style>
