<template>
  <div id="app">
   <NavbarHeader></NavbarHeader>
    <router-view></router-view>
    <FooterHeader></FooterHeader>
   
  </div>
</template>

<script>
import NavbarHeader from './components/layouts/Navbar'
import FooterHeader from './components/layouts/Footer'
export default {
  name: 'app',
  components: {
    NavbarHeader,
    FooterHeader
  }
  
}
</script>

<style>

</style>
