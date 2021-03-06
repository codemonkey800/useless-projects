var harp                = require( 'harp' );
var fs                  = require( 'fs' );
var path                = require( 'path' );
var spawn               = require( 'child_process' ).spawn;
var postFilter          = require( './plugins/PostFilter' );
var PaginationGenerator = require( './plugins/PaginationGenerator' ).PaginationGenerator;

var generator;

function getGlobalData() {
    return JSON.parse( fs.readFileSync( 'harp.json' ).toString() ).globals;
}

function getPostsData() {
    return JSON.parse( fs.readFileSync( 'public/posts/_data.json' ).toString() );
}

function getTimeStamp() {
    var now = new Date();
    return '[ ' + ( now.getMonth() + 1 ) + '-' + now.getDate() + '-' + now.getFullYear()
                + ' ' + ( now.getHours() + 1 ) + 'h:' + now.getMinutes() + 'm:'
                + now.getSeconds() + 's:' + now.getMilliseconds() + 'ms ]';
}

function printMessage( message ) {
    console.log( getTimeStamp() + ' ' + message );
}

function regeneratePosts() {
    postFilter.createFilterPages();
    generator.generate();
}

function reloadPostData( callback ) {
    spawn( 'node', [ 'post', 'reload' ] ).on( 'close', callback );
}

function regenerateGlobalData() {
    var options = generator.getOptions();
        options.postsPerPage = getGlobalData().postsPerPage;
        generator.setOptions( options );
}

function startHarpServer( port ) {
    printMessage( 'Port started on port ' + port );
    harp.server( '.', { port: port } );

    regeneratePosts();

    fs.watchFile( 'public/posts/_data.json', function() {
        printMessage( 'Posts data changed...' );
        reloadPostData( function() {
            printMessage( 'Posts updated.' );
        } );
    } );
    fs.watchFile( 'public/_layouts/filter-page.jade', function() {
        printMessage( 'Filter page layout changed...' );
        regeneratePosts();
        printMessage( 'Filter pages updated.' );
    } );
    fs.watchFile( 'public/_layouts/paginated-page.jade', function() {
        printMessage( 'Paginated page layout changed...' );
        regeneratePosts();
        printMessage( 'Paginated pages updated.' );
    } );
    fs.watchFile( 'public/_layouts/post-page.jade', function() {
        printMessage( 'Post page layout changed...' );
        reloadPostData( function() {
            printMessage( 'Post pages updated.' );
        } );
    } );
    fs.watchFile( 'harp.json', function() {
        printMessage( 'Globals changed...' );
        regeneratePosts();
        printMessage( 'Globals updated.' );
    } );
}

function compileSite() {
    reloadPostData( function() {} );
    regenerateGlobalData();
    regeneratePosts();
    harp.compile( '.', '.' );
}

function main( args ) {
    var options = {
        postsPerPage: getGlobalData().postsPerPage,
        postsData: getPostsData(),
        firstPage: {
            dir: '/',
            fileName: 'index.jade',
            title: 'Home',
            layoutPath: ''
        },
        page: {
            dir: '/page/',
            title: 'Home - Page ',
            layoutPath: '../'
        }
    };
    generator = new PaginationGenerator( options );

    if( args.length === 2 ) {
        startHarpServer( 80 );
    } else if( args.length > 2 ) {
        if( args[ 2 ] === '--port' ) {
            if( args[ 3 ] !== undefined ) {
                startHarpServer( parseInt( args[ 3 ] ) );
            } else {
                console.log( 'Port not specified' );
            }
        } else if( args[ 2 ] === 'build' ) {
            compileSite();
        } else {
            console.log( 'Invalid command' );
        }
    }
}

main( process.argv );