# datecompiler

Add Year, Month, Day inputs for single date field

## Usage

`$('.input').datecompiler({options});`

## Config

### Options

#### prefix
Type: `String`
Default: `dc__`

Prefix of generated `<select/>` inputs

Output example:
```
<select class="dc__day">
...
</select>
```

#### separator
Type: `String`
Default: `/`

The symbol that separates the parts of the compiled date.

Output example:
```
// MM/DD/YYYY
09/06/2014
```

#### groupInputs
Type: `Boolean`
Default: `true`

Group generated `<select/>` inputs into a `<div/>`

#### groupClass
Type: `String`
Default: `Empty String`

Class of group `<div/>`.  

Output example:
```
<div class="">
...
</div>
```

#### selectClass
Type: `String`
Default: `form-control`

Extra class generated `<select/>` inputs.  Can be used with frameworks such as [Bootstrap](http://getbootstrap.com/css/#forms).

Output example:
```
<select class="dc__day form-control">
...
</div>
```

#### abbrMonths
Type: `Boolean | String`
Default: `true`

Abbreviate the month display to first three characters or not or display months as numbers by using a string value of `numbers`.

#### startYear
Type: `String | Integer`
Default:  _current year_

First year displayed as an `<option/>` in the year `<select/>` input.

#### futureYears
Type: `Integer`
Default: `5`

How many years forward from _current year_ to add to the year `<select />` input.

#### inputOrder
Type: `object`
Default: `{ day: 0, month: 1, year: 2 }`

Order  generated `<select/>` inputs are displayed.

#### outputOrder
Type: `object`
Default: `{ day: 1, month: 0, year: 2 }`

Order  value parts are returned in. E.g. MM/DD/YYYY

#### oncompile
Type: `function`
Default: `null`

Callback that is called when date updated (compiled). 

The new value string is passed to the callback as a parameter.

`this` within callback is the input element whose `value` being updated.

```
function(value) {
...
}
```

#### css
Type: `object`
Default: `{ properties: values }`

CSS to hide the target input. Some validation scripts don't validate `hidden` inputs or fields that have CSS settings of `display:none` or `visibility:hidden`.

## TODO:

 - Examples added to readme docs
 - Demo
 - More options: 
	 - Hidden input method ("hide" using CSS or `<hidden />` field)