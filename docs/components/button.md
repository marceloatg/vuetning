# Buttons
Buttons are clickable items used to perform an action.

<vuecode md>

<div slot="demo">
<slds-button label="Base" class="slds-m-around_x-small"/>
<slds-button label="Neutral" neutral class="slds-m-around_x-small"/>
<slds-button label="Brand" brand class="slds-m-around_x-small"/>
<slds-button label="Outline Brand" outline-brand class="slds-m-around_x-small"/>
<slds-button label="Destructive" destructive class="slds-m-around_x-small"/>
<slds-button label="Text Destructive" text-destructive class="slds-m-around_x-small"/>
<slds-button label="Success" success class="slds-m-around_x-small"/>
</div>

<div slot="code">

```html
<slds-button label="Base"/>
<slds-button neutral label="Neutral"/>
<slds-button brand label="Brand"/>
<slds-button outline-brand label="Outline Brand"/>
<slds-button destructive label="Destructive"/>
<slds-button text-destructive label="Text Destructive"/>
<slds-button success label="Success"/>
```

</div>

</vuecode>

## Disabled
Use a disabled attribute when a button can’t be clicked. To create a disabled button, append the <b>disabled</b> attribute to the button.

<vuecode md>

<div slot="demo">
<slds-button label="Base"  disabled class="slds-m-around_x-small"/>
<slds-button label="Neutral" neutral  disabled class="slds-m-around_x-small"/>
<slds-button label="Brand" brand  disabled class="slds-m-around_x-small"/>
<slds-button label="Outline Brand" outline-brand  disabled class="slds-m-around_x-small"/>
<slds-button label="Destructive" destructive  disabled class="slds-m-around_x-small"/>
<slds-button label="Text Destructive" text-destructive  disabled class="slds-m-around_x-small"/>
<slds-button label="Success" success  disabled class="slds-m-around_x-small"/>
</div>

<div slot="code">

```html
<slds-button label="Base" disabled/>
<slds-button neutral label="Neutral" disabled/>
<slds-button brand label="Brand" disabled/>
<slds-button outline-brand label="Outline Brand" disabled/>
<slds-button destructive label="Destructive" disabled/>
<slds-button text-destructive label="Text Destructive" disabled/>
<slds-button success label="Success" disabled/>
```

</div>

</vuecode>

## With Icons
Use a disabled attribute when a button can’t be clicked. To create a disabled button, append the <b>disabled</b> attribute to the button.

<vuecode md>

<div slot="demo">
<slds-button neutral label="Icon Button" icon="utility:download" />
<slds-button neutral label="Left Icon Button" icon="utility:download" left/>
<slds-button neutral label="Right Icon Button" icon="utility:download" right/>
</div>

<div slot="code">

```html
<slds-button neutral label="Icon Button" icon="utility:download" />
<slds-button neutral label="Left Icon Button" icon="utility:download" left/>
<slds-button neutral label="Right Icon Button" icon="utility:download" right/>
```

</div>

</vuecode>

## With Spinner

<vuecode md>

<div slot="demo">
<slds-button label="Base"  spinner class="slds-m-around_x-small"/>
<slds-button label="Neutral" neutral  spinner class="slds-m-around_x-small"/>
<slds-button label="Brand" brand  spinner class="slds-m-around_x-small"/>
<slds-button label="Outline Brand" outline-brand  spinner class="slds-m-around_x-small"/>
<slds-button label="Destructive" destructive  spinner class="slds-m-around_x-small"/>
<slds-button label="Text Destructive" text-destructive  spinner class="slds-m-around_x-small"/>
<slds-button label="Success" success  spinner class="slds-m-around_x-small"/>
</div>

<div slot="code">

```html
<slds-button label="Base" spinner/>
<slds-button neutral label="Neutral" spinner/>
<slds-button brand label="Brand" spinner/>
<slds-button outline-brand label="Outline Brand" spinner/>
<slds-button destructive label="Destructive" spinner/>
<slds-button text-destructive label="Text Destructive" spinner/>
<slds-button success label="Success" spinner/>
```

</div>

</vuecode>

## Sizing
To allow the button's width to take up the entire width available, append the <b>stretch</b> attribute to the button.

<vuecode md>

<div slot="demo">
<slds-button neutral label="Stretch" stretch/>
</div>

<div slot="code">

```html
<slds-button neutral label="Stretch" stretch/>
```

</div>

</vuecode>
