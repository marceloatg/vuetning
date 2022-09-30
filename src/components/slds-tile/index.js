import sldsTile from './slds-tile.vue'
import sldsTileArticle from './slds-tile-article.vue'
import sldsTileItem from './slds-tile-item.vue'

export default Vue => {
    Vue.component(sldsTile.name, sldsTile)
    Vue.component(sldsTileArticle.name, sldsTileArticle)
    Vue.component(sldsTileItem.name, sldsTileItem)
}
