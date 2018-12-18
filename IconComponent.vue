<template>  
    <span>
        <div v-html="require(`SVGPATH/${icon}.svg`)"></div>
    </span>
   
</template> 
<script>

export default {
    name: 'IconComponent',
    data() {
        return {
            
        }
    },
    props: {
        'icon': {
            type: String
        }
    }
}
</script>
