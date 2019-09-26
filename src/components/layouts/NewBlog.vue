<template>
    <div class="container">
        <div class="row pb-3 pt-3">
            <h3>Add Blog Post</h3>
           
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
              <button class="btn btn-secondary" v-on:change="uploadFeaturedImage">Back</button>
            </div>
        </form>
    
    </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde'
import firebasePlugin from '../firebaseInit.js'

export default {
    data() {
        return {
            title: '',
            content: '',
            created_at: '',
            tags: [],
            featuredImage: '',
            filename: '',
            uploadFile: '',
            fullDate: new Date().toJSON().slice(0,10).replace(/-/g,'-')
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
        addBlogPost(event) {

            var storageRef = firebasePlugin.storage().ref('blog_feature_image/'+this.fileName);
                storageRef.put(this.uploadFile).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                }); 
            
            firebasePlugin.firestore().collection('blog_content').add({
                blog_id: Math.floor(Math.random() * 100000),
                title: this.title,
                content: this.content,
                created_at: this.fullDate,
                image_full: this.fileName,
                updated_at: ''
            }).then(docRef => this.$router.push('/'))
              .catch(insertError => console.log(insertError));
            
         
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

  img.preview {
    width: auto;
    background-color: white;
    border: 1px solid #DDD;
    padding: 5px;
}

form {
    padding-bottom: 10em;
}
</style>