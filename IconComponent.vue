<template>
    <object data="require(`SVGPATH/${icon}.svg`)" type="`${icon}.svg`"></object>  
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
