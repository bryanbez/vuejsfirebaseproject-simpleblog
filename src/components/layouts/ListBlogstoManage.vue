<template>
    <div class="container pt-5">
      <h3 class="lean">Recent Blog Posts</h3>
      <br />
        <div class="card mb-4" v-for="blog in blogs" v-bind:key="blog.id">
          <div class="row no-gutters">
              <div class="col-md-3">
                  <img class="card-img img-fluid" v-bind:src="blog.imageLink.i" > <!-- Wag burahin yung .i sa image yan -->
              </div>
              <div class="col-md-9">
                  <div class="card-body">
                      <h5 class="card-title"> {{ blog.title | capitalize }} </h5>
                      <p> <span class="badge badge-pill badge-secondary">{{ blog.tags }}</span> </p>
                      <p class="card-text"> {{ blog.content | cut-paragraph }} </p>
                      <p class="card-text"><small class="text-muted">Created: {{ blog.created_at }}</small></p>

                     <router-link class="badge badge-secondary mr-3" v-bind:to="{
                         name: 'editblog',
                         params: { blog_id: blog.blog_id }
                     }">Edit Blog</router-link>

                     <span @click="deleteBlog(blog.blog_id)" class="badge badge-danger mr-3"> Delete Blog </span>

                  </div>
              </div>
          </div>
       </div>
     <hr />
    </div>
</template>

<script>
import firebasePlugin from '../firebaseInit.js'

export default {
    data() {
        return {
            blogs: [],
            imageUrl: ''
        }
    },
    created() {
        firebasePlugin.firestore().collection('blog_content').orderBy('updated_at').get().then(querySnaphot => {
            querySnaphot.forEach(doc => {

                const data = {
                    'id': doc.id,
                    'blog_id': doc.data().blog_id,
                    'content': doc.data().content,
                    'created_at': doc.data().created_at,
                    'imageLink': firebasePlugin.storage().ref().child('blog_feature_image/'+doc.data().image_full).getDownloadURL(),
                    'tags': doc.data().tags,
                    'title': doc.data().title,
                    'updated_at': doc.data().updated_at,

                }
                this.blogs.push(data);

            });

        });
    },
    methods: {
      deleteBlog(blog_id) {
        firebasePlugin.firestore().collection('blog_content').where('blog_id', '==', blog_id).get()
        .then(querySnaphot => {
          querySnaphot.forEach(doc => {
            doc.ref.delete();
            alert('Blog Deleted')
            this.$router.push('/')
          })
        })
      }
    },

    filters: {
        'cut-paragraph': function(value) {
            return (value.substring(0,200) + "...");
        },
        'capitalize': function(value) {
            return value.toUpperCase();
        }
    }

}
</script>

<style scoped>

hr {
    padding-bottom: 10em;
}
span {
  cursor: pointer;
}


</style>
