const path= require('path') ;


const createEntry=name=>path.resolve(__dirname, './src', `${name}.js`)
const createOutputPath=name=>path.resolve(__dirname, './dist')


module.exports=(env , argv)=>({

    entry: createEntry('i1') ,

    output: {
        path: createOutputPath() ,
        filename: '[name].js'
    } ,

    module:{
        rules:[
            {
                use: 'babel-loader' ,
                test: /\.m?js$/ ,
                exclude: /(node_modules|bower_components)/
            }
        ]
    }

    // mode ,
    // module ,
    // plugins ,
    // devServer

}) ;