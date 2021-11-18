<template>
    <div style="height:25rem">
        <div class="slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open">
            <label class="slds-form-element__label" for="date-input-id-default">
                Date
            </label>
            <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">
                <input id="date-input-id-default" type="text" placeholder=" " class="slds-input">
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
                        <h2 id="defaulPicker-month" aria-atomic="true" aria-live="assertive" class="slds-align-middle">
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
                        <label class="slds-assistive-text" for="defaulPicker_select">
                            Pick a Year
                        </label>
                        <div class="slds-select_container">
                            <select id="defaulPicker_select" class="slds-select">
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                            </select>
                        </div>
                    </div>
                </div>
                <table aria-labelledby="defaulPicker-month" aria-multiselectable="true" class="slds-datepicker__month" role="grid">
                    <thead>
                        <tr id="defaulPicker-weekdays">
                            <th id="defaulPicker-Sunday" scope="col">
                                <abbr title="Sunday">Sun</abbr>
                            </th>
                            <th id="defaulPicker-Monday" scope="col">
                                <abbr title="Monday">Mon</abbr>
                            </th>
                            <th id="defaulPicker-Tuesday" scope="col">
                                <abbr title="Tuesday">Tue</abbr>
                            </th>
                            <th id="defaulPicker-Wednesday" scope="col">
                                <abbr title="Wednesday">Wed</abbr>
                            </th>
                            <th id="defaulPicker-Thursday" scope="col">
                                <abbr title="Thursday">Thu</abbr>
                            </th>
                            <th id="defaulPicker-Friday" scope="col">
                                <abbr title="Friday">Fri</abbr>
                            </th>
                            <th id="defaulPicker-Saturday" scope="col">
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
    </div>
</template>

<script>
export default {
    name: 'SldsDatePicker'
}
</script>

<style scoped>

</style>
