let mix = require('laravel-mix');

class SVGIcon {
    
    name() {
        return 'svgicon'
    }
    
    dependencies() {
        return ['vue-svg-loader'];
    }

    webpackRules() {
        return {
            test: /\.svg$/,
            loader: 'html-loader',
            options: {
                minimize: true
            }
        };
    }

    webpackConfig(webpackConfig) {
        webpackConfig.resolve.alias.SVG = path.resolve(__dirname, this.configPath);
        // TODO: add support for additional paths
        //webpackConfig.resolve.alias.Zondicons = path.resolve(__dirname, '../svg/zondicons');
    }

    register(configPath = './public/resources/svg') {
        this.configPath = configPath;
    }

    boot() {
        //console.log('loading svgicon');
        Mix.listen('configReady', function (config) {  
            const rules = config.module.rules;
            const targetRegex = /(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/;
            
            for (let rule of rules) {
                if (rule.test.toString() == targetRegex.toString()) {
                rule.exclude = /\.svg$/;
                break;
                }
            }
        });
    }

}

mix.extend('svgicon', new SVGIcon());