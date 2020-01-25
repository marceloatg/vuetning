# Checkbox Button
A styled checkable input that communicates if an option is being added to a group.

<vuecode md>

<div slot="demo">
<slds-checkbox-button />
</div>

<div slot="code">

```html
<slds-checkbox-button v-model="myBoolean"/>
```

</div>

</vuecode>

## Checked

<vuecode md>

<div slot="demo">
<slds-checkbox-button checked/>
</div>

<div slot="code">

```html
<slds-checkbox-button v-model="myBoolean" checked/>
```

</div>

</vuecode>

## Disabled

<vuecode md>

<div slot="demo">
<slds-checkbox-button disabled/>
</div>

<div slot="code">

```html
<slds-checkbox-button v-model="myBoolean" disabled/>
```

</div>

</vuecode>

## Different Icon

<vuecode md>

<div slot="demo">
<slds-checkbox-button icon="utility:recycle_bin_empty"/>
<slds-checkbox-button icon="utility:recycle_bin_empty" checked/>
</div>

<div slot="code">

```html
<slds-checkbox-button v-model="myBoolean" icon="utility:recycle_bin_empty"/>
<slds-checkbox-button v-model="myBoolean" icon="utility:recycle_bin_empty" checked/>
```

</div>

</vuecode>
