$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has URL defined', function() {
            allFeeds.forEach(feed => {
                // alternative: expect(feed.url).toBeTruthy();
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('has a name defined', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', () => {

        it('is hidden', () => {
            // evaluate boolean as true
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });


        it('is changes visibility when the menu icon is clicked', () => {
            const menuIcon = $('.menu-icon-link');
            // first trigger opens menu
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // second trigger closes menu
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', () => {

        beforeEach(done => loadFeed(0, done));

        it('has a single .entry element within the .feed container', (done) => {
            // selected only .entry decesendants of .feed container
            const entryElement = $('.feed .entry');
            expect(entryElement.length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', () => {

        // declare global variables for this test
        let firstFeed;
        let secondFeed;

        beforeEach((done) => {
            // get first load feed information
            loadFeed(0, () => {
                firstFeed = $('.feed').html();
                // start next feed
                loadFeed(1, () => {
                    // get second load feed information
                    secondFeed = $('.feed').html();
                    done();
                });

            });

        });

        it('has loaded new content', (done) => {
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });


        afterEach((done) => {
            // reset to the first loadFeed
            loadFeed(0, done);
        });

    });
}());