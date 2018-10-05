/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {

        /* This first test ensures that all of our RSS feeds in the
         * allFeeds variable are defined as a group, and that there
         * is actually feeds to be found.
         */

        it('are defined as a group', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This second test loops through the allFeeds variable and
         * determines that each feed has a properly defined url that
         * is not empty.
         */

        it('all have a URL that is clearly and properly defined', function() {
            for (var i = 0; i <allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });

        /* This third test loops through the allFeeds variable and
         * determines that each feed has a properly defined name that
         * is not empty.
         */
  
        it('all have a name that is clearly and properly defined', function() {
            for (var i = 0; i <allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
        });
    });
});

$(function() { 

    describe('The menu', function() {

        /* The first test of this suite determines that the default
         * load state of the menu is to be hidden, by determining that
         * the menu-hidden class is the default class.
         */

         it('is hidden by default', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* This second test checks the functionality of menu clickability
          * and opening by doing four things: clicking on the menu, seeing
          * that the click turns off the menu-hidden class, clicking on
          * the menu again, and seeing that the second click turns the 
          * menu-hidden class back on.
          */

          it('displays when the icon is clicked', function() {
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });    
});

$(function() {   

    describe('Initial Entries', function() {

        /* This test determines that the loadFeed function is called; that
         * it completes its work; and that when it is finished, there is
         * at least one entry in the feed.
         */

         beforeEach(function(done) {
                loadFeed(0, done);
         });

         it('to have at least one entry in the feed', function() {
                var feedLength = $('.feed .entry').length;
                expect(feedLength).toBeGreaterThan(0);
         });

    });
});

$(function() {

    describe('New Feed Selection', function() {

        /* This test ensures that when the loadFeed function loads a new
         * feed, that the content actually changes.
         */

         var oldFeed;

         beforeEach(function(done) {
                loadFeed(0, function() {
                    oldFeed = $('.feed').html();
                    loadFeed(1, done);
                });
         });

         it('changes when a new feed is loaded', function () {
                expect($('.feed').html()).not.toEqual(oldFeed);
         });
    });
});