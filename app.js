'use strict';

const path = require('path');
const express = require('express');

const soy = require('./node_modules/clobl/soy').setOptions({
    closureLibrary: path.join(
        __dirname,
        'node_modules/google-closure-library'
    ),
    closureTemplates: path.join(
        __dirname,
        'node_modules/closure-templates'
    )
});

soy.loadFiles([path.join(__dirname, 'build/compiledServerSoy/server.soy.concat.js')]);

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
	var html = soy.render('tr.lProfile.Template.base', {params: {name: "Александр Петров"}});

    res.header('Content-Type', 'text/html; charset=utf-8');
    res.end(html);	
});

app.listen(3000, function() {
    console.log('Running at port %s', 3000);
});