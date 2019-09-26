<template>
    <div>
        <nav class="navbar navbar-dark navbar-inverse navbar-expand-lg navbar-toggleable-xs bg-secondary text-white">
            <div class="container">
                 <router-link class="navbar-brand" v-bind:to="'/'">My Website</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggle-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mainNav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a href="" class="nav-link active">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">Blogs</a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">Downloads</a>
                        </li>
                      
                    </ul>
                </div>
            </div>
        </nav>
   
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>