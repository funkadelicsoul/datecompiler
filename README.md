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

#### startYear
Type: `String | Integer`
Default:  _current year_

First year displayed as an `<option/>` in the year `<select/>` input.

#### futureYears
Type: `Integer`
Default: `5`

How many years forward from _current year_ to add to the year `<select />` input.

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


## TODO:

 - Examples added to readme docs
 - Demo
 - More options: 
	 - date order (YYYY-MM-DD, DD-MM-YYYY, MM-DD-YYYY)
	 - Hidden input method ("hide" using CSS or `<hidden />` field)