const mix = require('laravel-mix');
const path = require('path');

class SVGIcon {
    
    name() {
        return 'svgicon'
    }
    
    dependencies() {
        
    }

    webpackRules() {
        return {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        };
    }

    register(configPath = './../public/resources/svg') {
        this.configPath = configPath;
        let absPath = path.normalize(this.configPath);
        mix.webpackConfig({
            resolve: {
                alias: {
                    'SVGPATH': path.resolve(absPath)
                }
            }
        })
    }

    boot() {
        //console.log('loading svgicon');
        Mix.listen('configReady', function (config) {  
            const rules = config.module.rules;
            const targetRegex = /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/;
            
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

module.exports = SVGIcon;
