<template>
    <div>
        <Navs/>
        <router-view></router-view>
    </div>
</template>
<script>
import Navs from '../components/Nav'
export default {
    name:'Laytou',
    components:{
        Navs
    }
}
</script>