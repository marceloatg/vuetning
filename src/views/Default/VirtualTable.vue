<template>
    <div class="table">

        <div class="header">

            <div class="column">
                Name
            </div>

            <div class="column">
                Email
            </div>

            <div class="column">
                Phone
            </div>

        </div>

        <RecycleScroller
            class="body"
            :items="list"
            :item-size="32">

            <template v-slot="{ item }">
                <div class="row">

                    <div class="cell">
                        {{ item.name }}
                    </div>

                    <div class="cell">
                        {{ item.email }}
                    </div>

                    <div class="cell">
                        {{ item.phone }}
                    </div>

                </div>
            </template>
        </RecycleScroller>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
            }
        },
        created() {
            for (let i = 0; i < 1000; i++) {
                this.list.push({
                    id: i,
                    name: `Item number ${i}`,
                    email: `user_${i}@arcthos.com`,
                    phone: `(55) ${i}-${i}`,
                })
            }
        },
    }
</script>

<style scoped lang="scss">

    .table {
        background: white;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);
        border: 1px solid #dddbda;
        border-radius: .25rem;
        height: 544px;
    }

    .header{
        height: 32px;
        display: flex;
        align-items: center;
        font-weight: bold;
        border-bottom: 1px solid #dddbda;
    }

    .body {
        height: 512px;
    }

    .row {
        height: 32px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dddbda;
    }

    .column {
        padding: 0 12px;
        height: 100%;
        width: 100%;
        line-height: 32px;
        vertical-align: center;
    }

    .cell {
        padding: 0 12px;
        height: 100%;
        width: 100%;
        line-height: 32px;
        vertical-align: center;
    }
</style>