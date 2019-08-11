# JustEat - Visible Hygiene Ratings


Displays hygiene ratings from the Food Standards Agency for restaurants without extra clicks.
Lets you hide or remove restaurants that don't meet your rating.

This script is for use on the [Just Eat](https://just-eat.co.uk) website using the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) chrome plugin.

## Install
1. Install the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) chrome plugin.
2. Click the Tampermonkey icon in chrome and select `"Create a new script..."`
3. Copy and paste the contents of `build/main.js` file into the text area.
4. In the editor select `"File"` then `"Save"`.
5. Done! Now visit [Just Eat](https://just-eat.co.uk) to se it in action.

## Options

**Cache Time**

The amount of time in seconds, to cache the results from the Food Standards Agency. The default is 7 days.

```javascript 1.8
let CACHE_TIME = 60 * 60 * 24 * 7; // Defaults to 7 days
```
---
**Bad Restaurant Action**

The "Bad restaurant Action" option is the action to take if the minimum rating threshold (see below) is not reached.

There are currently *4* options available.

Value | Action
------|--------
`BadResultAction.NoAction`| Does nothing with matched results.
`BadResultAction.Delete` | Removes the matched results from the page.
`BadResultAction.FadeOnly`| Fades the matched items in place.
`BadResultAction.MoveAndFade` | Moves the matched items to the bottom of the list and fades them.
 
 ```javascript 1.8
let BAD_RESTAURANT_ACTION = BadResultAction.MoveAndFade; // Defaults to BadResultAction.MoveAndFade
```
---
**Minimum Rating Threshold**

The minimum rating threshold is the lowest rating a restaurant can have before an action is taken. The default value is 4. 

```javascript 1.8
let MIN_RATING_THRESHOLD = 4; // Defaults to 4
```