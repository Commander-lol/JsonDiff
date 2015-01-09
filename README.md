JsonDiff
========
Keep a diff of selected JSON localstorage entries.

By using the [StorageEvents](https://github.com/Commander-lol/StorageEvents) library to get events
whenever `localstorage` is updated, JsonDiff keeps a list of individual changes as they are made to
selected JSON entries. In essence, it creates a history of the object and is also stored in localstorage.

Simple usage requires the following:

```html
<script type="text/javascript" src="path/to/js/StorageEvents.js"></script>
<script type="text/javascript" src="path/to/js/jsondiff.js"></script>
```

as well as a single line of javascript to say what to watch (JsonDiff maintains the watchlist in memory,
it isn't written to any form of storage):

```javascript
window.jsondiff.monitor("myobject");
```

Diff format
-------------
Each diff adheres to the following format:

```json
{
    "property": "Property Affected",
    "action": "Change That Occured",
    "oldvalue": "Previous Value",
    "newvalue": "New Value"
}
```

Each property that is changed generates a diff and explains how the object was modified,
allowing for full reconstruction of the monitored object.

There are three possible values for the `action` property:
* Changed - The property previously existed and its value was updated
* Added - The property did not previously exist, meaning that `oldvalue` will be null
* Removed - The property used to exist, but was deleted, resulting in `newvalue` being null
