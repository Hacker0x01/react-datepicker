var context = require.context( ".", true, /_test$/ );
context.keys().forEach( context );
