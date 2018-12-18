# laravel-mix-vue-svgicon

Laravel Mix extension that provides loading svgs as a vue component named icon, compatible with Adam Wathan's Blade extension. This package is inspired by the post by Caleb Porzio - [Using inline SVGs in Vue components.](http://calebporzio.com/using-inline-svgs-in-vue-compoments/)

## Installation
`npm install laravel-mix-vue-svgicon`

## Setup
In your `webpack.mix.js` to the top of the file, add: `require('laravel-mix-vue-svgicon');` . 

Then in your `mix` method chain add: `.svgicon('your path here')`.

If you do not provide a path to the method, the default path is `./../public/resources/svg` to provide compatability with [Adam Wathan's Blade SVG package.](https://github.com/adamwathan/blade-svg)

**Note the path that** `.svgicon()` **takes is relative to the root directory where your webpack.mix.js file resides. If your path is incorrect then the extension will not work and webpack will throw an error that it cannot load the module `SVGPATH`.**

## Usage

### Default

Once you have the package installed and the mix extension active you may use the icon component like anyother vue.js component. The sole property that the component takes is the name of the file under the svg directory you provided to the mix method. E.g., file is `resources/svg/close.svg`, `webpack.mix.js` includes `mix.svgicon(resources/svg)` and the consuming vue component looks like this:

```javascript
<template>
    <div class="w-1/4 flex flex-row justify-end" v-tooltip.right-start="{content: 'Cancel', classes: 'tooltip'}">
        <button class="text-black hover:text-white w-6 h-6 p-1 rounded hover:bg-red-dark" v-on:click.stop="cancel">
            <icon icon="close" class="w-full fill-current stroke-current"></icon>               
        </button>
    </div>
</template>
<script>

import Icon from 'laravel-mix-vue-svgicon/IconComponent.vue';

export default {
    props: [
        'route'
    ],
    data: function() {
        return {
        
        }
    },
    methods:{
        cancel: function(event) {
            var vm = this;
            window.location.href = vm.route;
        }
    },
    components: {
        Icon,
    }
}
</script>
```
### Additional Child Directories

Additionally, nested folders of svg's under the svg root directory provided to the mix method can be accessed by simply giving the component the relative path & file name, minus the file extension. E.g., the `resources/svg` folder contains a folder `zondicons`.

```javascript
<template>
    <div class="w-1/4 flex flex-row justify-end" v-tooltip.right-start="{content: 'Cancel', classes: 'tooltip'}">
        <button class="text-black hover:text-white w-6 h-6 p-1 rounded hover:bg-red-dark" v-on:click.stop="cancel">
            <icon icon="zondicons/close" class="w-full fill-current stroke-current"></icon>               
        </button>
    </div>
</template>
<script>

import Icon from 'laravel-mix-vue-svgicon/IconComponent.vue';

export default {
    props: [
        'route'
    ],
    data: function() {
        return {
        
        }
    },
    methods:{
        cancel: function(event) {
            var vm = this;
            window.location.href = vm.route;
        }
    },
    components: {
        Icon,
    }
}
</script>
<style lang="scss">

</style>
```
