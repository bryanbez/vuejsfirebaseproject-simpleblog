<template>
    <div>
        <WelcomeMsg></WelcomeMsg>
        <hr> 
        <RecentBlog></RecentBlog>
    </div>
</template>

<script>
import WelcomeMsg from '../../components/layouts/WelcomeMsg'
import RecentBlog from '../../components/layouts/RecentBlogPreview'
export default {
    components: {
        WelcomeMsg,
        RecentBlog
    }
}
</script>

<style scoped>

</style>