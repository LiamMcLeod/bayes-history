/**
 * Created by dual1ty on 22/02/2016.
 */

var config = {};

config.dir = {};
                        // example of dirs
    config.dir.root     = appRoot;
    config.dir.views    = appRoot+'/views';
    config.dir.public   = appRoot+'/public';
    config.dir.favicon  = config.dir.public+    '/favicon';
    config.dir.js       = config.dir.public+    '/js';
    config.dir.libs     = config.dir.public+    '/libs';
    config.dir.css      = config.dir.public+    '/css';
    config.dir.img      = config.dir.public+    '/img';
    config.dir.files    = config.dir.public+    '/files';

config.db = {};
    // Warning Case Sensitive
    config.db.dbms  =   'postgres://';
    config.db.host  =   'localhost';
    config.db.port  =   '5432'; //3306 MySQL //27017 MongoDB //5432 Postgres
    config.db.user  =   'postgres';
    config.db.pass  =   ''; // "", root, toor.
    config.db.base  =   'bayes';
    if (process.env.NODE_ENV) config.db.url = process.env.DATABASE_URL;
    else config.db.url   =   config.db.dbms+config.db.user+':'+config.db.pass+'@'+config.db.host+':'+config.db.port+'/'+config.db.base;


    config.port = {};
    // Default ports
    config.port.default = process.env.PORT || 8080 || 80
    config.port.alternate = 3000;

config.secret = 'dvorak';

module.exports = config;
