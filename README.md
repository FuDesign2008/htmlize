htmlize
=======

Parse plain text to html with url, line break, list recognition

##Introduction

The htmlize can convert plain text to html with recognition for:

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


##API

```javascript

htmlize.htmlize(text);

```

For example:

```javascript

var plainText = 'xxxx...',
    html = window.htmlize.htmlize(plainText),
    container = document.getElementById('container');

if (container) {
    container.innerHTML = html;
}

```

##Feedback

If you have any advice, please feel free to contact with me:  FuDesign2008@163.com
