// ==UserScript==
// @name         JustEat - Visible Hygiene Ratings
// @version      1.0
// @description  Displays hygiene ratings for restaurants without extra clicks. Lets you hide or remove restaurants that don't meet your rating.
// @author       Ross Young
// @match        https://www.just-eat.co.uk/area/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    let BadResultAction;
    (function (BadResultAction) {
        BadResultAction[BadResultAction["NoAction"] = 0] = "NoAction";
        BadResultAction[BadResultAction["Delete"] = 1] = "Delete";
        BadResultAction[BadResultAction["MoveAndFade"] = 2] = "MoveAndFade";
        BadResultAction[BadResultAction["FadeOnly"] = 3] = "FadeOnly";
    })(BadResultAction || (BadResultAction = {}));
    /*********************************************************
     * [CONFIGURATION] Cache Time
     * The amount of time (in seconds) to cache the results from
     * the Food Standards Agency.
     *
     * Defaults to 7 days.
     *
     * Default: 60 * 60 * 24 * 7
     *********************************************************/
    let CACHE_TIME = 60 * 60 * 24 * 7;
    /*********************************************************
     * [CONFIGURATION] Minimum Rating Threshold
     * The minimum number of stars (from the hygiene
     * rating website) required before an action is
     * taken.
     *
     * Default: 4
     *********************************************************/
    let MIN_RATING_THRESHOLD = 4;
    /*********************************************************
     * [CONFIGURATION] Bad Restaurant Action
     * Which actions to perform if minimum rating
     * has not been reached. Available options are:
     *
     * - BadResultAction.Delete       | Removes item from list.
     * - BadResultAction.MoveAndFade  | Moves the item to the bottom of the list and fades it out.
     * - BadResultAction.FadeOnly     | Fades out the item in place.
     * - BadResultAction.NoAction     | Do nothing.
     *
     * Default: BadResultAction.MoveAndFade
     *********************************************************/
    let BAD_RESTAURANT_ACTION = BadResultAction.MoveAndFade;
    class RestaurantManager {
        constructor(cacheTime) {
            this.url = "https://hygieneratingscdn.je-apis.com/api/uk/restaurants/";
            this.cacheTime = cacheTime;
        }
        getRestaurant(key) {
            let data = JSON.parse(window.localStorage.getItem(key));
            if (null === data || (((Date.now() - data.localCacheDate) / 1000) > this.cacheTime)) {
                return this.fetchData(key);
            }
            return data;
        }
        fetchData(key) {
            let url = this.url + key;
            let request = new XMLHttpRequest();
            request.open('GET', url, false);
            request.send(null);
            let data = JSON.parse(request.responseText);
            data.localCacheDate = Date.now();
            window.localStorage.setItem(key, JSON.stringify(data));
            return data;
        }
    }
    const restaurants = document.querySelectorAll('section[data-restaurant-id]');
    let manager = new RestaurantManager(CACHE_TIME);
    restaurants.forEach(function (element) {
        let id = element.getAttribute('data-restaurant-id');
        let data = manager.getRestaurant(id);
        let img = new Image();
        img.src = data.imageUrl;
        img.width = 100;
        img.style.width = "100px";
        img.style.position = "absolute";
        img.style.right = "23px";
        img.style.top = "25%";
        element.append(img);
        if (data.rating < MIN_RATING_THRESHOLD) {
            switch (BAD_RESTAURANT_ACTION) {
                case BadResultAction.Delete:
                    element.remove();
                    break;
                case BadResultAction.MoveAndFade:
                    element.style.opacity = "0.2";
                    element.parentElement.appendChild(element);
                    break;
                case BadResultAction.FadeOnly:
                    element.style.opacity = "0.2";
                    break;
            }
        }
    });
})();
