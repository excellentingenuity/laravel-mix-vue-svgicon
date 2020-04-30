const mix = require('laravel-mix');
const path = require('path');

class SVGIcon {
    
    name() {
        return 'svgicon'
    }
    
    dependencies() {
        return ['img-loader', 'imagemin-svgo', 'raw-loader', 'fs', 'svg-vue'];
    }

    register(options) {
        this.options = Object.assign({
            svgPath: 'resources/svg',
            extract: false,
            svgoSettings: [
                { removeTitle: true },
                { removeViewBox: false },
                { removeDimensions: true }
            ]
        }, options);

        this.includePath = path.resolve(__dirname, process.cwd() + '/' + this.options.svgPath);
    }

    boot() {
        Mix.listen('configReady', config => {
            config.module.rules.map(r => {
                if (this._isSvgRegExp(r.test) && ! this._isSvgVueRule(r)) {
                    r.exclude = path.resolve(__dirname, process.cwd() + '/' + this.options.svgPath);
                }
            });
        });
    }

    webpackRules() {
        return {
            test: /\.svg$/,
            include: [
                this.includePath
            ],
            loaders: [
                {
                    loader: 'raw-loader'
                },

                {
                    loader: 'img-loader',
                    options: {
                        plugins: [
                            require('imagemin-svgo')({ plugins: this.options.svgoSettings })
                        ]
                    }
                }
            ]
        }
    }

    webpackConfig(webpackConfig) {
        let fs = require('fs');

        fs.mkdir(this.includePath, error => {
            if (error && error.code === 'EEXIST') return null;
        });

        webpackConfig.resolve.alias['svg-files-path'] = this.includePath;

        if (this.options.extract) {
            let svgAssetsObj = {
                test: this.includePath,
                name: '/js/svg',
                chunks: 'all',
                enforce: true
            }

            if (webpackConfig.optimization.hasOwnProperty('splitChunks')) {
                webpackConfig.optimization.splitChunks.cacheGroups['svgAssets'] = svgAssetsObj;
            } else {
                webpackConfig.optimization = {
                    splitChunks: {
                        cacheGroups: {
                            svgAssets: svgAssetsObj
                        }
                    }
                }
            }
        }
    }

    _isSvgRegExp(pattern) {
        let regExCheck = new RegExp(pattern);

        return regExCheck.test('.svg') || regExCheck.test('font.svg');
    }

    _isSvgVueRule(rule) {
        if (rule.hasOwnProperty('include')) {
            return rule.include.includes(this.includePath);
        }

        return false;
    }

}

mix.extend('svgicon', new SVGIcon());

module.exports = SVGIcon;
