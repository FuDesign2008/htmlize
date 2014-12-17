htmlize
=======

parse plain text to html with url, line break, list recognition

##auto recognition items

### url

Convert an url to an `<a/>` tag.

* normal url
* email address

### line break

Convert a line break to a `<br/>`.


### horizontal line

Convert a line of content that is composed by only with more than 3 `-` to a horizontal line.


### (nested) orderlist

Order list signs:

* digit with one or more whitespaces (`2    hello`)
* digit + dot with one or more whitespaces (`3.  world`)

### (nested) unorderlist

Unorder list signs

* `*` with one or more whitespaces (`* hello`)
* `-` with one or more whitespaces (`- hello`)


##example

