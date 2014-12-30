StorageEvents
=============

A quick script that provides a wrapper for <code>localstorage</code> that dispatches events when data is changed. 
Accesible through the alias <code>storage</code>, StorageEvents can be used in most places where localstorage would
be used; it provides the functions <code>setItem( key, value )</code>, <code>removeItem( key )</code> and 
<code>clear()</code>, while <code>getItem( key )</code> is provided for completeness.

Calling any method that potentially changes data stored in <code>localstorage</code> will dispatch an event to the 
<code>window</code> object, and can be guarenteed to contain the following parameters:
* <code>key</code> - The key of the <code>localstorage</code> entry that has been modified
* <code>oldValue</code> - The previous value that was stored in <code>localstorage</code>. Will be null if the
entry was previously unset
* <code>newValue</code> - The new value that will be stored in <code>localstorage</code>. Will be null if the entry is being deleted
