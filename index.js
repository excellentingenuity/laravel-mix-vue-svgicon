let mix = require('laravel-mix');

class SVGIcon {
    
    name() {
        return 'svgicon'
    }
    
    dependencies() {
        
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

    register(configPath = './../public/resources/svg') {
        this.configPath = configPath;
        let absPath = process.cwd() + '/' + this.configPath;
        mix.webpackConfig({
            resolve: {
                alias: {
                    'SVGPATH': path.resolve(__dirname, absPath)
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
