<template>
    <div>魔板</div>
</template>

<script>
export default {
    props: ['gsg'],

    beforeCreate(){
        console.log('beforeCreate', this.$props, this.gsg)
    },

    created(){
        console.log('created',this.$props)
    },
    mounted() {
        console.log('mounted')
    }
}
</script>
