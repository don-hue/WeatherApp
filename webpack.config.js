const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    entry:'./src/Javascript/index.js',
    mode: 'development',
    module: {
        rules:[
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                type: 'asset/resource',
            },

            {
                test:/\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ]
    },

    plugins: [new HtmlWebpackPlugin()],

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname,'dist'),
    },
    
}