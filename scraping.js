var Spooky = require('spooky'),
    spooky, scrape;

spooky = new Spooky({
    casper: {
        logLevel: 'debug',
        verbose: true
    }
}, function(err) {
    scrape(err);
});

scrape = function(err) {
    if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        throw e;
    }

    spooky.on('error', function(e) {
        console.error(e);
    });

    spooky.on('log', function(log) {
        if (log.space === 'remote') {
            console.log(log.message.replace(/ \- .*/, ''));
        }
    });

    spooky.start('http://t93.herokuapp.com');
    spooky.thenEvaluate(function() {
        console.log('Hello, from', document.title);
    });
    spooky.run();
};

