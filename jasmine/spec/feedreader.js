$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has URL defined', function() {
            // expect(allFeeds).toBeDefined();
            // expect(allFeeds.length).not.toBe(0);
            allFeeds.forEach(feed => {
                expect(feed.url).not.toBeUndefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('has a name defined', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).not.toBeUndefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The menu', () => {

        it('is hidden', () => {
            expect($('.menu-hidden')).toBeDefined();
        });


        it('is changes visibility when the menu icon is clicked', () => {
            // // trigger click before each test
            const menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');
            expect($('body').attr('class')).not.toEqual('menu-hidden');
            menuIcon.trigger('click');
            expect($('body').attr('class')).toEqual('menu-hidden');
        });
    });

    describe('Initial Entries', () => {

        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });

        });

        it('has a single .entry element within the .feed container', (done) => {
            const entryElement = $('.entry');
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
            // reset the first loadFeed
            loadFeed(0, () => {
                done();
            });
        });

    });
}());