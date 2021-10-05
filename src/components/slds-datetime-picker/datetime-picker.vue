<template>
    <div class="slds-form">
        <fieldset class="slds-form-element slds-form-element_compound">
            <legend class="slds-form-element__label slds-form-element__legend">
                Date and Time
            </legend>
            <div class="slds-form-element__control">
                <div class="slds-form-element__group">
                    <div class="slds-form-element__row">
                        <div class="slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">
                            <label class="slds-form-element__label" for="text-input-unique-id-7">
                                Date
                            </label>
                            <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">
                                <input id="text-input-unique-id-7" type="text" placeholder=" " class="slds-input">
                                <button class="slds-button slds-button_icon slds-input__icon slds-input__icon_right" title="Select a date">
                                    <svg class="slds-button__icon" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#event"/>
                                    </svg>
                                    <span class="slds-assistive-text">Select a date</span>
                                </button>
                            </div>
                            <div aria-hidden="false" aria-label="Date picker: June" class="slds-datepicker slds-dropdown slds-dropdown_left" role="dialog">
                                <div class="slds-datepicker__filter slds-grid">
                                    <div class="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">
                                        <div class="slds-align-middle">
                                            <button class="slds-button slds-button_icon slds-button_icon-container" title="Previous Month">
                                                <svg class="slds-button__icon" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#left"/>
                                                </svg>
                                                <span class="slds-assistive-text">Previous Month</span>
                                            </button>
                                        </div>
                                        <h2 id="undefined-month" aria-atomic="true" aria-live="assertive" class="slds-align-middle">
                                            June
                                        </h2>
                                        <div class="slds-align-middle">
                                            <button class="slds-button slds-button_icon slds-button_icon-container" title="Next Month">
                                                <svg class="slds-button__icon" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#right"/>
                                                </svg>
                                                <span class="slds-assistive-text">Next Month</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="slds-shrink-none">
                                        <label class="slds-assistive-text" for="undefined_select">
                                            Pick a Year
                                        </label>
                                        <div class="slds-select_container">
                                            <select id="undefined_select" class="slds-select">
                                                <option>2020</option>
                                                <option>2021</option>
                                                <option>2022</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <table aria-labelledby="undefined-month" aria-multiselectable="true" class="slds-datepicker__month" role="grid">
                                    <thead>
                                        <tr id="undefined-weekdays">
                                            <th id="undefined-Sunday" scope="col">
                                                <abbr title="Sunday">Sun</abbr>
                                            </th>
                                            <th id="undefined-Monday" scope="col">
                                                <abbr title="Monday">Mon</abbr>
                                            </th>
                                            <th id="undefined-Tuesday" scope="col">
                                                <abbr title="Tuesday">Tue</abbr>
                                            </th>
                                            <th id="undefined-Wednesday" scope="col">
                                                <abbr title="Wednesday">Wed</abbr>
                                            </th>
                                            <th id="undefined-Thursday" scope="col">
                                                <abbr title="Thursday">Thu</abbr>
                                            </th>
                                            <th id="undefined-Friday" scope="col">
                                                <abbr title="Friday">Fri</abbr>
                                            </th>
                                            <th id="undefined-Saturday" scope="col">
                                                <abbr title="Saturday">Sat</abbr>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td aria-selected="false" class="slds-day_adjacent-month" role="gridcell">
                                                <span class="slds-day">31</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell" tabindex="0">
                                                <span class="slds-day">1</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">2</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">3</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">4</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">5</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">6</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">7</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">8</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">9</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">10</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">11</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">12</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">13</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">14</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">15</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">16</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">17</span>
                                            </td>
                                            <td aria-selected="false" aria-current="date" class="slds-is-today" role="gridcell">
                                                <span class="slds-day">18</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">19</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">20</span>
                                            </td>
                                        </tr>
                                        <tr class="">
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">21</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">22</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">23</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">24</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">25</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">26</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">27</span>
                                            </td>
                                        </tr>
                                        <tr class="">
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">28</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">29</span>
                                            </td>
                                            <td aria-selected="false" class="" role="gridcell">
                                                <span class="slds-day">30</span>
                                            </td>
                                            <td aria-selected="false" class="slds-day_adjacent-month" role="gridcell">
                                                <span class="slds-day">1</span>
                                            </td>
                                            <td aria-selected="false" class="slds-day_adjacent-month" role="gridcell">
                                                <span class="slds-day">2</span>
                                            </td>
                                            <td aria-selected="false" class="slds-day_adjacent-month" role="gridcell">
                                                <span class="slds-day">3</span>
                                            </td>
                                            <td aria-selected="false" class="slds-day_adjacent-month" role="gridcell">
                                                <span class="slds-day">4</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button class="slds-button slds-align_absolute-center slds-text-link">
                                    Today
                                </button>
                            </div>
                        </div>
                        <div class="slds-form-element">
                            <label class="slds-form-element__label" for="combobox-unique-id-3">
                                Time
                            </label>
                            <div class="slds-form-element__control">
                                <div class="slds-combobox_container">
                                    <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-combobox-picklist slds-timepicker" aria-expanded="false" aria-haspopup="listbox" role="combobox">
                                        <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                                            <input
                                                id="combobox-unique-id-3"
                                                type="text"
                                                class="slds-input slds-combobox__input"
                                                aria-autocomplete="list"
                                                autoComplete="off"
                                                role="textbox"
                                                placeholder=" ">
                                            <span class="slds-icon_container slds-icon-utility-clock slds-input__icon slds-input__icon_right">
                                                <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#clock"/>
                                                </svg>
                                            </span>
                                        </div>
                                        <div id="listbox-unique-id" role="listbox" class="slds-dropdown slds-dropdown_fluid slds-dropdown_length-5">
                                            <ul class="slds-listbox slds-listbox_vertical" role="presentation">
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-25" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="6:00am"> 6:00am</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-26" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="7:00am"> 7:00am</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-27" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center slds-is-selected" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="8:00am">
                                                                <span class="slds-assistive-text">Current Selection:</span> 8:00am</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-28" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="9:00am"> 9:00am</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-29" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="10:00am"> 10:00am</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-30" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="11:00am"> 11:00am</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-31" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="12:00pm"> 12:00pm</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-32" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="1:00pm"> 1:00pm</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-33" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="2:00pm"> 2:00pm</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-34" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="3:00pm"> 3:00pm</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-35" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="4:00pm"> 4:00pm</span>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li role="presentation" class="slds-listbox__item">
                                                    <div id="listbox-option-unique-id-36" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center" role="option">
                                                        <span class="slds-media__figure">
                                                            <svg class="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
                                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"/>
                                                            </svg>
                                                        </span>
                                                        <span class="slds-media__body">
                                                            <span class="slds-truncate" title="5:00pm"> 5:00pm</span>
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
export default {
    name: 'SldsDatetimePicker'
}
</script>

<style scoped>

</style>
