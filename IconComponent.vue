<template>  
    <span>
        <div v-html="require(`SVG/${icon}.svg`)"></div>
    </span>
   
</template> 
<script>

export default {
    name: 'IconComponent',
    props: {
        'icon': {
            type: String
        }
    }
}
</script>
