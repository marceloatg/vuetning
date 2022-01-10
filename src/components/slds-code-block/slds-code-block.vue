<template>
    <div class="dx-theme-light">

        <!-- Toolbar -->
        <div class="toolbar slds-grid">

            <!-- Heading -->
            <div v-if="label">
                <div class="dx-text-heading-7 dx-code-block-heading">
                    {{ label }}
                </div>
            </div>

            <!-- Theme button -->
            <div class="slds-col_bump-left">
                <slds-button-icon
                    v-if="themeButton"
                    bare
                    icon="utility:away"
                    title="Copy"
                    @click="onClickCopy"
                />
            </div>

            <!-- Copy button -->
            <div>
                <slds-button-icon
                    v-if="copyButton"
                    bare
                    :icon="icon"
                    title="Copy"
                    @click="onClickCopy"
                />
            </div>

        </div>

        <!-- Content -->
        <div class="code-block-content">
            <pre class="codeblock line-numbers language-markup"><code class="language-markup">{{ code }}<span aria-hidden="true" class="line-numbers-rows"><span v-for="i in codeLines" :key="i"/></span></code></pre>
        </div>

    </div>
</template>

<script>
import SldsButtonIcon from '@/components/slds-button-icon/slds-button-icon'

export default {
  name: 'SldsCodeBlock',

  components: {
    SldsButtonIcon,
  },

  props: {
    code: String,
    copyButton: Boolean,
    label: String,
    plainText: Boolean,
    required: Boolean,
    themeButton: Boolean,
  },

  data() {
    return {
      icon: 'utility:copy',
      timer: null
    }
  },

  computed:{
    codeLines() {
      return this.code.split('\n').length
    }
  },

  methods: {
    onClickCopy() {
      const el = document.createElement('textarea')
      el.value = this.code
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)

      this.icon = 'utility:check'
      if (this.timer) return

      this.timer = setTimeout(function () {
        this.resetIcon()
      }.bind(this), 1500)
    },

    resetIcon() {
      this.icon = 'utility:copy'
      this.timer = null
    }
  }
}
</script>

<style scoped lang="scss">

.dx-theme-light {
  --dx-g-animation-fadein: fadeIn 0.2s linear forwards;
  --dx-g-breakpoint-sm: 640px;
  --dx-g-breakpoint-md: 768px;
  --dx-g-breakpoint-lg: 1024px;
  --dx-g-breakpoint-xl: 1280px;
  --dx-g-hot-orange-vibrant-95: rgba(254, 241, 237, 1);
  --dx-g-hot-orange-vibrant-90: rgba(255, 222, 213, 1);
  --dx-g-hot-orange-vibrant-80: rgba(254, 185, 165, 1);
  --dx-g-hot-orange-vibrant-70: rgba(255, 144, 110, 1);
  --dx-g-hot-orange-vibrant-65: rgba(255, 120, 79, 1);
  --dx-g-hot-orange-vibrant-60: rgba(255, 93, 45, 1);
  --dx-g-hot-orange-vibrant-50: rgba(216, 58, 0, 1);
  --dx-g-hot-orange-vibrant-40: rgba(170, 48, 1, 1);
  --dx-g-hot-orange-vibrant-30: rgba(126, 38, 0, 1);
  --dx-g-hot-orange-vibrant-20: rgba(84, 29, 1, 1);
  --dx-g-hot-orange-vibrant-10: rgba(40, 18, 2, 1);
  --dx-g-hot-orange-natural-95: rgba(250, 242, 240, 1);
  --dx-g-hot-orange-natural-90: rgba(245, 225, 219, 1);
  --dx-g-hot-orange-natural-80: rgba(238, 191, 177, 1);
  --dx-g-hot-orange-natural-70: rgba(232, 155, 130, 1);
  --dx-g-hot-orange-natural-65: rgba(230, 135, 105, 1);
  --dx-g-hot-orange-natural-60: rgba(227, 115, 79, 1);
  --dx-g-hot-orange-natural-50: rgba(192, 83, 46, 1);
  --dx-g-hot-orange-natural-40: rgba(150, 67, 36, 1);
  --dx-g-hot-orange-natural-30: rgba(112, 50, 25, 1);
  --dx-g-hot-orange-natural-20: rgba(74, 36, 19, 1);
  --dx-g-hot-orange-natural-10: rgba(35, 20, 11, 1);
  --dx-g-orange-vibrant-95: rgba(255, 241, 234, 1);
  --dx-g-orange-vibrant-90: rgba(254, 223, 208, 1);
  --dx-g-orange-vibrant-80: rgba(255, 186, 144, 1);
  --dx-g-orange-vibrant-70: rgba(254, 147, 57, 1);
  --dx-g-orange-vibrant-65: rgba(243, 131, 3, 1);
  --dx-g-orange-vibrant-60: rgba(221, 122, 1, 1);
  --dx-g-orange-vibrant-50: rgba(169, 100, 4, 1);
  --dx-g-orange-vibrant-40: rgba(130, 81, 1, 1);
  --dx-g-orange-vibrant-30: rgba(95, 62, 2, 1);
  --dx-g-orange-vibrant-20: rgba(62, 43, 2, 1);
  --dx-g-orange-vibrant-10: rgba(32, 22, 0, 1);
  --dx-g-orange-natural-95: rgba(249, 242, 239, 1);
  --dx-g-orange-natural-90: rgba(245, 225, 216, 1);
  --dx-g-orange-natural-80: rgba(240, 191, 162, 1);
  --dx-g-orange-natural-70: rgba(235, 156, 96, 1);
  --dx-g-orange-natural-65: rgba(224, 141, 70, 1);
  --dx-g-orange-natural-60: rgba(204, 130, 63, 1);
  --dx-g-orange-natural-50: rgba(156, 106, 51, 1);
  --dx-g-orange-natural-40: rgba(121, 85, 38, 1);
  --dx-g-orange-natural-30: rgba(89, 64, 27, 1);
  --dx-g-orange-natural-20: rgba(58, 44, 20, 1);
  --dx-g-orange-natural-10: rgba(29, 23, 10, 1);
  --dx-g-yellow-vibrant-95: rgba(251, 243, 224, 1);
  --dx-g-yellow-vibrant-90: rgba(249, 227, 182, 1);
  --dx-g-yellow-vibrant-80: rgba(252, 192, 3, 1);
  --dx-g-yellow-vibrant-70: rgba(228, 162, 1, 1);
  --dx-g-yellow-vibrant-65: rgba(215, 147, 4, 1);
  --dx-g-yellow-vibrant-60: rgba(202, 133, 1, 1);
  --dx-g-yellow-vibrant-50: rgba(168, 100, 3, 1);
  --dx-g-yellow-vibrant-40: rgba(140, 75, 2, 1);
  --dx-g-yellow-vibrant-30: rgba(111, 52, 0, 1);
  --dx-g-yellow-vibrant-20: rgba(79, 33, 0, 1);
  --dx-g-yellow-vibrant-10: rgba(40, 18, 2, 1);
  --dx-g-yellow-natural-95: rgba(251, 243, 226, 1);
  --dx-g-yellow-natural-90: rgba(248, 227, 183, 1);
  --dx-g-yellow-natural-80: rgba(239, 195, 107, 1);
  --dx-g-yellow-natural-70: rgba(216, 165, 78, 1);
  --dx-g-yellow-natural-65: rgba(203, 151, 71, 1);
  --dx-g-yellow-natural-60: rgba(190, 137, 64, 1);
  --dx-g-yellow-natural-50: rgba(156, 106, 51, 1);
  --dx-g-yellow-natural-40: rgba(128, 81, 39, 1);
  --dx-g-yellow-natural-30: rgba(100, 58, 27, 1);
  --dx-g-yellow-natural-20: rgba(70, 38, 19, 1);
  --dx-g-yellow-natural-10: rgba(35, 20, 11, 1);
  --dx-g-green-vibrant-95: rgba(235, 247, 230, 1);
  --dx-g-green-vibrant-90: rgba(205, 239, 196, 1);
  --dx-g-green-vibrant-80: rgba(145, 219, 139, 1);
  --dx-g-green-vibrant-70: rgba(69, 198, 90, 1);
  --dx-g-green-vibrant-65: rgba(65, 182, 88, 1);
  --dx-g-green-vibrant-60: rgba(59, 167, 85, 1);
  --dx-g-green-vibrant-50: rgba(46, 132, 74, 1);
  --dx-g-green-vibrant-40: rgba(34, 104, 62, 1);
  --dx-g-green-vibrant-30: rgba(25, 78, 49, 1);
  --dx-g-green-vibrant-20: rgba(14, 53, 34, 1);
  --dx-g-green-vibrant-10: rgba(7, 27, 18, 1);
  --dx-g-green-natural-95: rgba(235, 247, 230, 1);
  --dx-g-green-natural-90: rgba(205, 239, 196, 1);
  --dx-g-green-natural-80: rgba(145, 219, 139, 1);
  --dx-g-green-natural-70: rgba(112, 191, 117, 1);
  --dx-g-green-natural-65: rgba(104, 176, 112, 1);
  --dx-g-green-natural-60: rgba(95, 162, 105, 1);
  --dx-g-green-natural-50: rgba(74, 128, 87, 1);
  --dx-g-green-natural-40: rgba(57, 101, 71, 1);
  --dx-g-green-natural-30: rgba(41, 75, 54, 1);
  --dx-g-green-natural-20: rgba(28, 51, 38, 1);
  --dx-g-green-natural-10: rgba(13, 26, 19, 1);
  --dx-g-teal-vibrant-95: rgba(222, 249, 243, 1);
  --dx-g-teal-vibrant-90: rgba(172, 243, 228, 1);
  --dx-g-teal-vibrant-80: rgba(4, 225, 203, 1);
  --dx-g-teal-vibrant-70: rgba(1, 195, 179, 1);
  --dx-g-teal-vibrant-65: rgba(3, 180, 167, 1);
  --dx-g-teal-vibrant-60: rgba(6, 165, 154, 1);
  --dx-g-teal-vibrant-50: rgba(11, 130, 124, 1);
  --dx-g-teal-vibrant-40: rgba(5, 103, 100, 1);
  --dx-g-teal-vibrant-30: rgba(2, 77, 76, 1);
  --dx-g-teal-vibrant-20: rgba(2, 52, 52, 1);
  --dx-g-teal-vibrant-10: rgba(0, 27, 28, 1);
  --dx-g-teal-natural-95: rgba(222, 249, 243, 1);
  --dx-g-teal-natural-90: rgba(172, 243, 228, 1);
  --dx-g-teal-natural-80: rgba(115, 219, 203, 1);
  --dx-g-teal-natural-70: rgba(99, 189, 177, 1);
  --dx-g-teal-natural-65: rgba(91, 174, 165, 1);
  --dx-g-teal-natural-60: rgba(83, 160, 152, 1);
  --dx-g-teal-natural-50: rgba(66, 126, 122, 1);
  --dx-g-teal-natural-40: rgba(53, 100, 97, 1);
  --dx-g-teal-natural-30: rgba(37, 74, 73, 1);
  --dx-g-teal-natural-20: rgba(26, 50, 50, 1);
  --dx-g-teal-natural-10: rgba(12, 26, 26, 1);
  --dx-g-cloud-blue-vibrant-95: rgba(234, 245, 254, 1);
  --dx-g-cloud-blue-vibrant-90: rgba(207, 233, 254, 1);
  --dx-g-cloud-blue-vibrant-80: rgba(144, 208, 254, 1);
  --dx-g-cloud-blue-vibrant-70: rgba(26, 185, 255, 1);
  --dx-g-cloud-blue-vibrant-65: rgba(8, 171, 237, 1);
  --dx-g-cloud-blue-vibrant-60: rgba(13, 157, 218, 1);
  --dx-g-cloud-blue-vibrant-50: rgba(16, 124, 173, 1);
  --dx-g-cloud-blue-vibrant-40: rgba(5, 98, 138, 1);
  --dx-g-cloud-blue-vibrant-30: rgba(8, 73, 104, 1);
  --dx-g-cloud-blue-vibrant-20: rgba(2, 50, 72, 1);
  --dx-g-cloud-blue-vibrant-10: rgba(0, 26, 40, 1);
  --dx-g-cloud-blue-natural-95: rgba(239, 244, 249, 1);
  --dx-g-cloud-blue-natural-90: rgba(215, 231, 245, 1);
  --dx-g-cloud-blue-natural-80: rgba(167, 206, 236, 1);
  --dx-g-cloud-blue-natural-70: rgba(110, 181, 229, 1);
  --dx-g-cloud-blue-natural-65: rgba(99, 168, 213, 1);
  --dx-g-cloud-blue-natural-60: rgba(91, 154, 196, 1);
  --dx-g-cloud-blue-natural-50: rgba(72, 122, 155, 1);
  --dx-g-cloud-blue-natural-40: rgba(57, 96, 123, 1);
  --dx-g-cloud-blue-natural-30: rgba(42, 72, 92, 1);
  --dx-g-cloud-blue-natural-20: rgba(25, 49, 64, 1);
  --dx-g-cloud-blue-natural-10: rgba(12, 25, 33, 1);
  --dx-g-blue-vibrant-95: rgba(238, 244, 255, 1);
  --dx-g-blue-vibrant-90: rgba(216, 230, 254, 1);
  --dx-g-blue-vibrant-80: rgba(170, 203, 255, 1);
  --dx-g-blue-vibrant-70: rgba(120, 176, 253, 1);
  --dx-g-blue-vibrant-65: rgba(87, 163, 253, 1);
  --dx-g-blue-vibrant-60: rgba(27, 150, 255, 1);
  --dx-g-blue-vibrant-50: rgba(1, 118, 211, 1);
  --dx-g-blue-vibrant-40: rgba(11, 92, 171, 1);
  --dx-g-blue-vibrant-30: rgba(1, 68, 134, 1);
  --dx-g-blue-vibrant-20: rgba(3, 45, 96, 1);
  --dx-g-blue-vibrant-10: rgba(0, 22, 57, 1);
  --dx-g-blue-natural-95: rgba(241, 244, 249, 1);
  --dx-g-blue-natural-90: rgba(221, 230, 244, 1);
  --dx-g-blue-natural-80: rgba(181, 202, 238, 1);
  --dx-g-blue-natural-70: rgba(143, 175, 228, 1);
  --dx-g-blue-natural-65: rgba(122, 162, 224, 1);
  --dx-g-blue-natural-60: rgba(99, 149, 221, 1);
  --dx-g-blue-natural-50: rgba(78, 117, 180, 1);
  --dx-g-blue-natural-40: rgba(61, 92, 146, 1);
  --dx-g-blue-natural-30: rgba(46, 68, 112, 1);
  --dx-g-blue-natural-20: rgba(30, 45, 80, 1);
  --dx-g-blue-natural-10: rgba(15, 23, 45, 1);
  --dx-g-indigo-vibrant-95: rgba(241, 243, 251, 1);
  --dx-g-indigo-vibrant-90: rgba(224, 229, 248, 1);
  --dx-g-indigo-vibrant-80: rgba(190, 199, 246, 1);
  --dx-g-indigo-vibrant-70: rgba(158, 169, 241, 1);
  --dx-g-indigo-vibrant-65: rgba(142, 155, 239, 1);
  --dx-g-indigo-vibrant-60: rgba(127, 140, 237, 1);
  --dx-g-indigo-vibrant-50: rgba(88, 103, 232, 1);
  --dx-g-indigo-vibrant-40: rgba(58, 73, 218, 1);
  --dx-g-indigo-vibrant-30: rgba(47, 44, 183, 1);
  --dx-g-indigo-vibrant-20: rgba(38, 15, 143, 1);
  --dx-g-indigo-vibrant-10: rgba(32, 6, 71, 1);
  --dx-g-indigo-natural-95: rgba(242, 243, 249, 1);
  --dx-g-indigo-natural-90: rgba(226, 229, 242, 1);
  --dx-g-indigo-natural-80: rgba(194, 200, 232, 1);
  --dx-g-indigo-natural-70: rgba(165, 171, 220, 1);
  --dx-g-indigo-natural-65: rgba(151, 156, 216, 1);
  --dx-g-indigo-natural-60: rgba(138, 142, 209, 1);
  --dx-g-indigo-natural-50: rgba(106, 107, 197, 1);
  --dx-g-indigo-natural-40: rgba(84, 79, 179, 1);
  --dx-g-indigo-natural-30: rgba(67, 53, 147, 1);
  --dx-g-indigo-natural-20: rgba(50, 29, 113, 1);
  --dx-g-indigo-natural-10: rgba(32, 13, 56, 1);
  --dx-g-purple-vibrant-95: rgba(246, 242, 251, 1);
  --dx-g-purple-vibrant-90: rgba(236, 225, 249, 1);
  --dx-g-purple-vibrant-80: rgba(215, 191, 245, 1);
  --dx-g-purple-vibrant-70: rgba(194, 158, 241, 1);
  --dx-g-purple-vibrant-65: rgba(183, 141, 239, 1);
  --dx-g-purple-vibrant-60: rgba(173, 123, 238, 1);
  --dx-g-purple-vibrant-50: rgba(144, 80, 233, 1);
  --dx-g-purple-vibrant-40: rgba(117, 38, 227, 1);
  --dx-g-purple-vibrant-30: rgba(90, 27, 169, 1);
  --dx-g-purple-vibrant-20: rgba(64, 16, 117, 1);
  --dx-g-purple-vibrant-10: rgba(36, 6, 67, 1);
  --dx-g-purple-natural-95: rgba(245, 243, 248, 1);
  --dx-g-purple-natural-90: rgba(234, 226, 243, 1);
  --dx-g-purple-natural-80: rgba(211, 194, 232, 1);
  --dx-g-purple-natural-70: rgba(189, 163, 221, 1);
  --dx-g-purple-natural-65: rgba(178, 147, 215, 1);
  --dx-g-purple-natural-60: rgba(167, 131, 210, 1);
  --dx-g-purple-natural-50: rgba(140, 94, 198, 1);
  --dx-g-purple-natural-40: rgba(116, 62, 185, 1);
  --dx-g-purple-natural-30: rgba(88, 45, 138, 1);
  --dx-g-purple-natural-20: rgba(62, 29, 96, 1);
  --dx-g-purple-natural-10: rgba(34, 13, 53, 1);
  --dx-g-violet-vibrant-95: rgba(249, 240, 255, 1);
  --dx-g-violet-vibrant-90: rgba(242, 222, 254, 1);
  --dx-g-violet-vibrant-80: rgba(229, 185, 254, 1);
  --dx-g-violet-vibrant-70: rgba(216, 146, 254, 1);
  --dx-g-violet-vibrant-65: rgba(209, 125, 254, 1);
  --dx-g-violet-vibrant-60: rgba(203, 101, 255, 1);
  --dx-g-violet-vibrant-50: rgba(186, 1, 255, 1);
  --dx-g-violet-vibrant-40: rgba(150, 2, 199, 1);
  --dx-g-violet-vibrant-30: rgba(115, 3, 148, 1);
  --dx-g-violet-vibrant-20: rgba(82, 0, 102, 1);
  --dx-g-violet-vibrant-10: rgba(46, 0, 57, 1);
  --dx-g-violet-natural-95: rgba(247, 242, 251, 1);
  --dx-g-violet-natural-90: rgba(238, 225, 246, 1);
  --dx-g-violet-natural-80: rgba(221, 190, 237, 1);
  --dx-g-violet-natural-70: rgba(204, 156, 229, 1);
  --dx-g-violet-natural-65: rgba(196, 138, 225, 1);
  --dx-g-violet-natural-60: rgba(188, 119, 221, 1);
  --dx-g-violet-natural-50: rgba(169, 70, 212, 1);
  --dx-g-violet-natural-40: rgba(135, 55, 165, 1);
  --dx-g-violet-natural-30: rgba(103, 40, 123, 1);
  --dx-g-violet-natural-20: rgba(72, 26, 84, 1);
  --dx-g-violet-natural-10: rgba(40, 11, 46, 1);
  --dx-g-pink-vibrant-95: rgba(254, 240, 243, 1);
  --dx-g-pink-vibrant-90: rgba(253, 221, 227, 1);
  --dx-g-pink-vibrant-80: rgba(253, 182, 197, 1);
  --dx-g-pink-vibrant-70: rgba(254, 138, 167, 1);
  --dx-g-pink-vibrant-65: rgba(254, 114, 152, 1);
  --dx-g-pink-vibrant-60: rgba(255, 83, 138, 1);
  --dx-g-pink-vibrant-50: rgba(227, 6, 106, 1);
  --dx-g-pink-vibrant-40: rgba(182, 5, 84, 1);
  --dx-g-pink-vibrant-30: rgba(138, 3, 62, 1);
  --dx-g-pink-vibrant-20: rgba(97, 2, 42, 1);
  --dx-g-pink-vibrant-10: rgba(55, 1, 20, 1);
  --dx-g-pink-natural-95: rgba(250, 242, 243, 1);
  --dx-g-pink-natural-90: rgba(246, 224, 228, 1);
  --dx-g-pink-natural-80: rgba(238, 189, 198, 1);
  --dx-g-pink-natural-70: rgba(231, 152, 169, 1);
  --dx-g-pink-natural-65: rgba(227, 132, 155, 1);
  --dx-g-pink-natural-60: rgba(226, 110, 140, 1);
  --dx-g-pink-natural-50: rgba(197, 72, 109, 1);
  --dx-g-pink-natural-40: rgba(157, 56, 86, 1);
  --dx-g-pink-natural-30: rgba(118, 41, 64, 1);
  --dx-g-pink-natural-20: rgba(83, 26, 43, 1);
  --dx-g-pink-natural-10: rgba(46, 11, 21, 1);
  --dx-g-red-vibrant-95: rgba(254, 241, 238, 1);
  --dx-g-red-vibrant-90: rgba(254, 222, 216, 1);
  --dx-g-red-vibrant-80: rgba(254, 184, 171, 1);
  --dx-g-red-vibrant-70: rgba(254, 143, 125, 1);
  --dx-g-red-vibrant-65: rgba(254, 119, 101, 1);
  --dx-g-red-vibrant-60: rgba(254, 92, 76, 1);
  --dx-g-red-vibrant-50: rgba(234, 0, 30, 1);
  --dx-g-red-vibrant-40: rgba(186, 5, 23, 1);
  --dx-g-red-vibrant-30: rgba(142, 3, 15, 1);
  --dx-g-red-vibrant-20: rgba(100, 1, 3, 1);
  --dx-g-red-vibrant-10: rgba(48, 12, 1, 1);
  --dx-g-red-natural-95: rgba(250, 242, 240, 1);
  --dx-g-red-natural-90: rgba(246, 225, 221, 1);
  --dx-g-red-natural-80: rgba(239, 190, 181, 1);
  --dx-g-red-natural-70: rgba(233, 154, 140, 1);
  --dx-g-red-natural-65: rgba(229, 135, 119, 1);
  --dx-g-red-natural-60: rgba(226, 115, 98, 1);
  --dx-g-red-natural-50: rgba(204, 70, 57, 1);
  --dx-g-red-natural-40: rgba(162, 55, 45, 1);
  --dx-g-red-natural-30: rgba(123, 40, 32, 1);
  --dx-g-red-natural-20: rgba(86, 25, 19, 1);
  --dx-g-red-natural-10: rgba(41, 17, 10, 1);
  --dx-g-gray-95: rgba(243, 243, 243, 1);
  --dx-g-gray-90: rgba(229, 229, 229, 1);
  --dx-g-gray-60: rgba(147, 147, 147, 1);
  --dx-g-gray-50: rgba(116, 116, 116, 1);
  --dx-g-gray-30: rgba(68, 68, 68, 1);
  --dx-g-gray-10: rgba(11, 11, 11, 1);
  --sds-g-gray-1: rgba(255, 255, 255, 1);
  --sds-g-gray-2: rgba(250, 250, 249, 1);
  --sds-g-gray-3: rgba(243, 242, 242, 1);
  --sds-g-gray-4: rgba(236, 235, 234, 1);
  --sds-g-gray-5: rgba(221, 219, 218, 1);
  --sds-g-gray-6: rgba(201, 199, 197, 1);
  --sds-g-gray-7: rgba(176, 173, 171, 1);
  --sds-g-gray-8: rgba(150, 148, 146, 1);
  --sds-g-gray-9: rgba(112, 110, 107, 1);
  --sds-g-gray-10: rgba(81, 79, 77, 1);
  --sds-g-gray-11: rgba(62, 62, 60, 1);
  --sds-g-gray-12: rgba(43, 40, 38, 1);
  --sds-g-gray-13: rgba(8, 7, 7, 1);
  --dx-g-text-heading-color: var(--dx-g-blue-vibrant-20);
  --dx-g-text-body-color: var(--dx-g-gray-10);
  --dx-g-text-label-color: var(--dx-g-gray-30);
  --dx-g-text-button-color: var(--dx-g-blue-vibrant-50);
  --dx-g-text-button-light-color: white;
  --dx-g-brand-default-color-background: white;
  --dx-g-brand-default-button-color-background-inactive: var(--dx-g-gray-95);
  --dx-g-brand-default-button-color-background-active: var(--dx-g-cloud-blue-vibrant-95);
  --dx-g-brand-default-color: var(--dx-g-blue-vibrant-40);
  --dx-g-brand-default-color-border: var(--dx-g-gray-95);
  --dx-g-brand-default-color-background-2: var(--dx-g-cloud-blue-vibrant-95);
  --dx-g-brand-default-button-color-background-inactive-hover: var(--dx-g-gray-90);
  --dx-g-brand-default-color-border-2: var(--dx-g-gray-90);
  --dx-g-brand-employees-color-background: var(--dx-g-hot-orange-vibrant-95);
  --dx-g-brand-employees-button-color-background-inactive: var(--dx-g-hot-orange-vibrant-90);
  --dx-g-brand-employees-button-color-background-active: var(--dx-g-hot-orange-vibrant-80);
  --dx-g-brand-employees-color: var(--dx-g-hot-orange-vibrant-20);
  --dx-g-brand-employees-color-border: var(--dx-g-hot-orange-vibrant-90);
  --dx-g-brand-employees-color-background-2: white;
  --dx-g-brand-employees-button-color-background-inactive-hover: var(--dx-g-hot-orange-vibrant-80);
  --dx-g-brand-employees-color-border-2: var(--dx-g-hot-orange-vibrant-80);
  --dx-g-brand-marketing-color-background: var(--dx-g-orange-vibrant-95);
  --dx-g-brand-marketing-button-color-background-inactive: var(--dx-g-orange-vibrant-90);
  --dx-g-brand-marketing-button-color-background-active: var(--dx-g-orange-vibrant-80);
  --dx-g-brand-marketing-color: var(--dx-g-orange-natural-20);
  --dx-g-brand-marketing-color-border: var(--dx-g-orange-vibrant-90);
  --dx-g-brand-marketing-color-background-2: white;
  --dx-g-brand-marketing-button-color-background-inactive-hover: var(--dx-g-orange-vibrant-80);
  --dx-g-brand-marketing-color-border-2: var(--dx-g-orange-vibrant-80);
  --dx-g-brand-partners-color-background: var(--dx-g-yellow-natural-95);
  --dx-g-brand-partners-button-color-background-inactive: var(--dx-g-yellow-natural-90);
  --dx-g-brand-partners-button-color-background-active: var(--dx-g-yellow-natural-80);
  --dx-g-brand-partners-color: var(--dx-g-yellow-natural-20);
  --dx-g-brand-partners-color-border: var(--dx-g-yellow-natural-90);
  --dx-g-brand-partners-color-background-2: white;
  --dx-g-brand-partners-button-color-background-inactive-hover: var(--dx-g-yellow-natural-80);
  --dx-g-brand-partners-color-border-2: var(--dx-g-yellow-natural-80);
  --dx-g-brand-commerce-color-background: var(--dx-g-green-vibrant-95);
  --dx-g-brand-commerce-button-color-background-inactive: var(--dx-g-green-vibrant-90);
  --dx-g-brand-commerce-button-color-background-active: var(--dx-g-green-vibrant-80);
  --dx-g-brand-commerce-color: var(--dx-g-green-natural-20);
  --dx-g-brand-commerce-color-border: var(--dx-g-green-vibrant-90);
  --dx-g-brand-commerce-color-background-2: white;
  --dx-g-brand-commerce-button-color-background-inactive-hover: var(--dx-g-green-vibrant-80);
  --dx-g-brand-commerce-color-border-2: var(--dx-g-green-vibrant-80);
  --dx-g-brand-sales-color-background: var(--dx-g-teal-natural-95);
  --dx-g-brand-sales-button-color-background-inactive: var(--dx-g-teal-natural-90);
  --dx-g-brand-sales-button-color-background-active: var(--dx-g-teal-natural-80);
  --dx-g-brand-sales-color: var(--dx-g-teal-natural-20);
  --dx-g-brand-sales-color-border: var(--dx-g-teal-natural-90);
  --dx-g-brand-sales-color-background-2: white;
  --dx-g-brand-sales-button-color-background-inactive-hover: var(--dx-g-teal-natural-80);
  --dx-g-brand-sales-color-border-2: var(--dx-g-teal-natural-80);
  --dx-g-brand-success-color-background: var(--dx-g-cloud-blue-vibrant-95);
  --dx-g-brand-success-button-color-background-inactive: var(--dx-g-cloud-blue-vibrant-90);
  --dx-g-brand-success-button-color-background-active: var(--dx-g-cloud-blue-vibrant-80);
  --dx-g-brand-success-color: var(--dx-g-cloud-blue-natural-20);
  --dx-g-brand-success-color-border: var(--dx-g-cloud-blue-vibrant-90);
  --dx-g-brand-success-color-background-2: white;
  --dx-g-brand-success-button-color-background-inactive-hover: var(--dx-g-cloud-blue-vibrant-80);
  --dx-g-brand-success-color-border-2: var(--dx-g-cloud-blue-vibrant-80);
  --dx-g-brand-experience-color-background: var(--dx-g-blue-vibrant-95);
  --dx-g-brand-experience-button-color-background-inactive: var(--dx-g-blue-vibrant-90);
  --dx-g-brand-experience-button-color-background-active: var(--dx-g-blue-vibrant-80);
  --dx-g-brand-experience-color: var(--dx-g-blue-natural-20);
  --dx-g-brand-experience-color-border: var(--dx-g-blue-vibrant-90);
  --dx-g-brand-experience-color-background-2: white;
  --dx-g-brand-experience-button-color-background-inactive-hover: var(--dx-g-blue-vibrant-80);
  --dx-g-brand-experience-color-border-2: var(--dx-g-blue-vibrant-80);
  --dx-g-brand-integration-color-background: var(--dx-g-blue-vibrant-95);
  --dx-g-brand-integration-button-color-background-inactive: var(--dx-g-blue-vibrant-90);
  --dx-g-brand-integration-button-color-background-active: var(--dx-g-blue-vibrant-80);
  --dx-g-brand-integration-color: var(--dx-g-blue-natural-20);
  --dx-g-brand-integration-color-border: var(--dx-g-blue-vibrant-90);
  --dx-g-brand-integration-color-background-2: white;
  --dx-g-brand-integration-button-color-background-inactive-hover: var(--dx-g-blue-vibrant-80);
  --dx-g-brand-integration-color-border-2: var(--dx-g-blue-vibrant-80);
  --dx-g-brand-platform-color-background: var(--dx-g-indigo-vibrant-95);
  --dx-g-brand-platform-button-color-background-inactive: var(--dx-g-indigo-vibrant-90);
  --dx-g-brand-platform-button-color-background-active: var(--dx-g-indigo-vibrant-80);
  --dx-g-brand-platform-color: var(--dx-g-indigo-natural-20);
  --dx-g-brand-platform-color-border: var(--dx-g-indigo-vibrant-90);
  --dx-g-brand-platform-color-background-2: white;
  --dx-g-brand-platform-button-color-background-inactive-hover: var(--dx-g-indigo-vibrant-80);
  --dx-g-brand-platform-color-border-2: var(--dx-g-indigo-vibrant-80);
  --dx-g-brand-industries-color-background: var(--dx-g-purple-vibrant-95);
  --dx-g-brand-industries-button-color-background-inactive: var(--dx-g-purple-vibrant-90);
  --dx-g-brand-industries-button-color-background-active: var(--dx-g-purple-vibrant-80);
  --dx-g-brand-industries-color: var(--dx-g-purple-natural-20);
  --dx-g-brand-industries-color-border: var(--dx-g-purple-vibrant-90);
  --dx-g-brand-industries-color-background-2: white;
  --dx-g-brand-industries-button-color-background-inactive-hover: var(--dx-g-purple-vibrant-80);
  --dx-g-brand-industries-color-border-2: var(--dx-g-purple-vibrant-80);
  --dx-g-brand-learning-color-background: var(--dx-g-violet-vibrant-95);
  --dx-g-brand-learning-button-color-background-inactive: var(--dx-g-violet-vibrant-90);
  --dx-g-brand-learning-button-color-background-active: var(--dx-g-violet-vibrant-80);
  --dx-g-brand-learning-color: var(--dx-g-violet-natural-20);
  --dx-g-brand-learning-color-border: var(--dx-g-violet-vibrant-90);
  --dx-g-brand-learning-color-background-2: white;
  --dx-g-brand-learning-button-color-background-inactive-hover: var(--dx-g-violet-vibrant-80);
  --dx-g-brand-learning-color-border-2: var(--dx-g-violet-vibrant-80);
  --dx-g-brand-service-color-background: var(--dx-g-pink-vibrant-95);
  --dx-g-brand-service-button-color-background-inactive: var(--dx-g-pink-vibrant-90);
  --dx-g-brand-service-button-color-background-active: var(--dx-g-pink-vibrant-80);
  --dx-g-brand-service-color: var(--dx-g-pink-natural-20);
  --dx-g-brand-service-color-border: var(--dx-g-pink-vibrant-90);
  --dx-g-brand-service-color-background-2: white;
  --dx-g-brand-service-button-color-background-inactive-hover: var(--dx-g-pink-vibrant-80);
  --dx-g-brand-service-color-border-2: var(--dx-g-pink-vibrant-80);
  --dx-g-brand-analytics-color-background: var(--dx-g-red-vibrant-95);
  --dx-g-brand-analytics-button-color-background-inactive: var(--dx-g-red-vibrant-90);
  --dx-g-brand-analytics-button-color-background-active: var(--dx-g-red-vibrant-80);
  --dx-g-brand-analytics-color: var(--dx-g-red-natural-20);
  --dx-g-brand-analytics-color-border: var(--dx-g-red-vibrant-90);
  --dx-g-brand-analytics-color-background-2: white;
  --dx-g-brand-analytics-button-color-background-inactive-hover: var(--dx-g-red-vibrant-80);
  --dx-g-brand-analytics-color-border-2: var(--dx-g-red-vibrant-80);
  --dx-g-brand-collaboration-color-background: var(--dx-g-hot-orange-vibrant-95);
  --dx-g-brand-collaboration-button-color-background-inactive: var(--dx-g-hot-orange-vibrant-90);
  --dx-g-brand-collaboration-button-color-background-active: var(--dx-g-hot-orange-vibrant-80);
  --dx-g-brand-collaboration-color: var(--dx-g-hot-orange-natural-20);
  --dx-g-brand-collaboration-color-border: var(--dx-g-hot-orange-vibrant-90);
  --dx-g-brand-collaboration-color-background-2: white;
  --dx-g-brand-collaboration-button-color-background-inactive-hover: var(--dx-g-hot-orange-vibrant-80);
  --dx-g-brand-collaboration-color-border-2: var(--dx-g-hot-orange-vibrant-80);
  --dx-g-brand-heroku-color-background: var(--dx-g-indigo-vibrant-95);
  --dx-g-brand-heroku-button-color-background-inactive: var(--dx-g-indigo-vibrant-90);
  --dx-g-brand-heroku-button-color-background-active: var(--dx-g-indigo-vibrant-80);
  --dx-g-brand-heroku-color: var(--dx-g-indigo-natural-20);
  --dx-g-brand-heroku-color-border: var(--dx-g-indigo-vibrant-90);
  --dx-g-brand-heroku-color-background-2: white;
  --dx-g-brand-heroku-button-color-background-inactive-hover: var(--dx-g-indigo-vibrant-80);
  --dx-g-brand-heroku-color-border-2: var(--dx-g-indigo-vibrant-80);
  --dx-g-brand-slack-color-background: rgba(74, 21, 75, 1);
  --dx-g-icon-size-xs: 12px;
  --dx-g-icon-size-sm: 14px;
  --dx-g-icon-size-md: 16px;
  --dx-g-icon-size-lg: 20px;
  --dx-g-icon-size-xl: 36px;
  --dx-g-icon-size-2xl: 48px;
  --dx-g-page-padding-horizontal: var(--dx-g-spacing-3xl);
  --dx-g-page-padding-horizontal-lg: var(--dx-g-spacing-md);
  --dx-g-page-grid-gap: var(--dx-g-spacing-3xl);
  --dx-g-box-shadow-sm: 0px 0px 2px 0px rgba(24, 24, 24, 0.08), 0px 2px 4px 1px rgba(24, 24, 24, 0.16);
  --dx-g-box-shadow-md: 0px 2px 8px -2px rgba(24, 24, 24, 0.08), 0px 8px 12px -2px rgba(24, 24, 24, 0.16);
  --dx-g-box-shadow-lg: 0px 12px 24px -4px rgba(24, 24, 24, 0.08), 0px 16px 32px -4px rgba(24, 24, 24, 0.16);
  --dx-g-box-shadow-xl: 0px 24px 48px -4px rgba(24, 24, 24, 0.2);
  --dx-g-spacing-2xs: 2px;
  --dx-g-spacing-xs: 4px;
  --dx-g-spacing-sm: 8px;
  --dx-g-spacing-smd: 12px;
  --dx-g-spacing-md: 16px;
  --dx-g-spacing-mlg: 20px;
  --dx-g-spacing-lg: 24px;
  --dx-g-spacing-xl: 32px;
  --dx-g-spacing-2xl: 40px;
  --dx-g-spacing-3xl: 48px;
  --dx-g-spacing-4xl: 64px;
  --dx-g-spacing-5xl: 96px;
  --dx-g-spacing-6xl: 128px;
  --dx-g-transition-hue-1x: background 0.15s linear, color 0.15s linear, border-color 0.15s linear, opacity 0.15s linear, fill 0.15s linear;
  --dx-g-transition-box-shadow-1x: box-shadow 0.15s ease-in-out;
  --dx-g-transition-box-shadow-2x: box-shadow 0.3s ease-in-out;
  --dx-g-transition-transform-2x: transform 0.3s ease-in-out;
  --dx-g-transition-filter-2x: filter 0.3s linear;
  --dx-g-font-display: 'ITC Avant Garde', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --dx-g-font-sans: 'Salesforce Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --dx-g-font-mono: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  --dx-g-font-normal: 400;
  --dx-g-font-demi: 600;
  --dx-g-font-bold: 700;
  --dx-g-text-2xs: 11px;
  --dx-g-text-xs: 12px;
  --dx-g-text-sm: 14px;
  --dx-g-text-base: 16px;
  --dx-g-text-lg: 20px;
  --dx-g-text-xl: 24px;
  --dx-g-text-2xl: 30px;
  --dx-g-text-3xl: 40px;
  --dx-g-text-4xl: 48px;
  --dx-g-text-5xl: 56px;
  --dx-g-text-6xl: 80px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  --dx-g-z-index-0: 0;
  --dx-g-z-index-10: 10;
  --dx-g-z-index-20: 20;
  --dx-g-z-index-30: 30;
  --dx-g-z-index-40: 40;
  --dx-g-z-index-50: 50;
  --dx-g-z-index-100: 100;
  --dx-g-z-index-500: 500;
  --dx-g-z-index-max: 1000;
}

.toolbar {
  width: 100%;
}

.dx-variant-block .dx-button {
  --dx-c-button-primary-color: var(--dx-g-gray-50);
  --dx-c-button-primary-color-hover: var(--dx-g-gray-50);
  --dx-c-button-secondary-color-hover: var(--dx-g-gray-95);
  --dx-c-button-inline-color-hover: var(--dx-g-gray-50);
}

.dx-theme-dark.dx-variant-card .dx-button {
  --dx-c-button-primary-color: var(--dx-g-hot-orange-vibrant-95);
  --dx-c-button-primary-color-hover: var(--dx-g-hot-orange-vibrant-95);
  --dx-c-button-secondary-color-hover: var(--dx-g-blue-vibrant-10);
  --dx-c-button-inline-color-hover: var(--dx-g-hot-orange-vibrant-95);
}

.dx-theme-light.dx-variant-card .dx-button {
  --dx-c-button-primary-color: var(--dx-g-blue-vibrant-20);
  --dx-c-button-primary-color-hover: var(--dx-g-blue-vibrant-20);
  --dx-c-button-secondary-color-hover: var(--dx-g-hot-orange-vibrant-95);
  --dx-c-button-inline-color-hover: var(--dx-g-hot-orange-vibrant-95);
}

pre, code {
  font-size: 14px;
  text-shadow: none;
  font-family: var(--dx-g-font-mono);
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  line-height: 20px;
  tab-size: 4;
  hyphens: none;
}

pre::selection, code::selection, pre::mozselection, code::mozselection {
  text-shadow: none;
}

.dx-theme-dark code {
  color: rgb(255, 255, 255);
}

.dx-theme-light code {
  color: var(--dx-g-gray-10);
}

.dx-theme-dark code::mozselection {
  background: rgb(255, 255, 255);
}

.dx-theme-light code::mozselection {
  background: var(--dx-g-gray-95);
}

.dx-variant-card pre {
  padding: 1em;
  border-radius: 0 0 0.3em 0.3em;
  overflow: auto;
  word-wrap: normal;
  white-space: pre;
}

.dx-variant-card :not(pre) > code {
  padding: 0.1em 0.3em;
  border-radius: 0.3em;
}

.dx-variant-block pre {
  padding: 1em;
  border-radius: 0.3em;
  overflow: auto;
  word-wrap: normal;
  white-space: pre;
  width: 94%;
}

.dx-variant-block :not(pre) > code {
  padding: 0.1em 0.3em;
  border-radius: 0.3em;
}

.dx-theme-dark pre {
  color: rgb(255, 255, 255);
  background: var(--dx-g-blue-vibrant-10);
}

.dx-theme-dark :not(pre) > code {
  color: rgb(255, 255, 255);
  background: var(--dx-g-blue-vibrant-10);
}

.dx-theme-light pre {
  color: var(--dx-g-gray-10);
  background: var(--dx-g-gray-95);
}

.dx-theme-light :not(pre) > code {
  color: var(--dx-g-gray-10);
  background: var(--dx-g-gray-95);
}

.namespace {
  opacity: 0.7;
}

.token.important, .token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

pre[data-line] {
  position: relative;
}

pre > code {
  position: relative;
  display: block;
  z-index: 1;
}

.line-highlight {
  position: absolute;
  left: 0;
  right: 0;
  padding: inherit 0;
  margin-top: 1em;
  background: #1e2d50;
  box-shadow: inset 5px 0 0 #0176d3;
  z-index: 0;
  pointer-events: none;
  line-height: inherit;
  white-space: pre;
}

.line-numbers .line-highlight::before, .line-numbers .line-highlight::after {
  content: none;
}

.line-numbers-rows > span::before {
  content: counter(linenumber);
  color: var(--dx-g-gray-50);
  display: block;
  padding-right: 0.4em;
  text-align: right;
}

pre[id].linkable-line-numbers span.line-numbers-rows {
  pointer-events: all;
}

pre[id].linkable-line-numbers span.line-numbers-rows > span::before {
  cursor: pointer;
}

pre[id].linkable-line-numbers span.line-numbers-rows > span:hover::before {
  background-color: rgba(128, 128, 128, 0.2);
}

pre.line-numbers {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
}

pre.line-numbers > code {
  position: relative;
  white-space: inherit;
}

.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 0;
  font-size: 100%;
  left: -3.8em;
  width: 3em;
  letter-spacing: -1px;
  user-select: none;
}

.line-numbers-rows > span {
  display: block;
  counter-increment: linenumber;
}

.dx-variant-block.code-toolbar {
  display: flex;
}

div.code-toolbar.dx-variant-card {
  display: flex;
  flex-direction: column-reverse;
}

div.code-toolbar:hover > .toolbar {
  opacity: 1;
}

div.code-toolbar:focus-within > .toolbar {
  opacity: 1;
}

div.code-toolbar.dx-variant-card > .toolbar {
  border-radius: 0.3em 0.3em 0 0;
  opacity: 1;
  display: flex;
  align-items: center;
}

div.code-toolbar.dx-variant-block > .toolbar {
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

div.code-toolbar.dx-theme-dark.dx-variant-card > .toolbar {
  background-color: var(--dx-g-blue-natural-20);
}

div.code-toolbar.dx-theme-light.dx-variant-card > .toolbar {
  background-color: var(--dx-g-gray-90);
}

.dx-variant-block .toolbar-item {
  padding-left: 4px;
}

.dx-variant-card .toolbar-item:first-child {
  flex-basis: 95%;
}

.dx-variant-card .dx-code-block-heading {
  transform: translateY(3px);
  padding-left: 20px;
}

.dx-variant-card.dx-theme-dark .dx-code-block-heading {
  color: white !important;
}

.dx-variant-card.dx-theme-light .dx-code-block-heading {
  color: var(--dx-g-blue-vibrant-20);
}

div.code-toolbar > .toolbar .toolbar-item {
  display: inline-block;
}

div.code-toolbar > .toolbar a {
  cursor: pointer;
}

div.code-toolbar > .toolbar a, div.code-toolbar > .toolbar button, div.code-toolbar > .toolbar a:hover, div.code-toolbar > .toolbar a:focus, div.code-toolbar > .toolbar button:hover, div.code-toolbar > .toolbar button:focus, div.code-toolbar > .toolbar span:hover, div.code-toolbar > .toolbar span:focus {
  color: inherit;
  text-decoration: none;
}

.dx-text-heading-1 {
  color: var(--dx-g-text-heading-color);
  font-family: var(--dx-g-font-display);
  font-size: 64px;
  letter-spacing: -0.6px;
  line-height: 64px;
}

.dx-text-heading-2 {
  color: var(--dx-g-text-heading-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-5xl);
  letter-spacing: -0.6px;
  line-height: 60px;
}

.dx-text-heading-3 {
  color: var(--dx-g-text-heading-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-3xl);
  letter-spacing: -0.4px;
  line-height: 40px;
}

.dx-text-heading-4 {
  color: var(--dx-g-text-heading-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-xl);
  letter-spacing: -0.1px;
  line-height: 28px;
}

.dx-text-heading-5 {
  color: var(--dx-g-text-heading-color);
  font-family: var(--dx-g-font-display);
  font-size: 18px;
  letter-spacing: -0.1px;
  line-height: 24px;
}

.dx-text-heading-6 {
  color: var(--dx-g-text-heading-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-base);
  letter-spacing: 0;
  line-height: 20px;
}

.dx-text-heading-7 {
  color: var(--dx-g-text-heading-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-sm);
  letter-spacing: 0;
  line-height: 18px;
}

.dx-text-heading-alt-1 {
  color: var(--dx-g-text-label-color);
  font-family: var(--dx-g-font-sans);
  font-size: var(--slds-text-lg);
  line-height: 25px;
}

.dx-text-body-1 {
  color: var(--dx-g-text-body-color);
  font-family: var(--dx-g-font-sans);
  font-size: var(--dx-g-text-lg);
  letter-spacing: 0;
  line-height: 32px;
}

.dx-text-body-2 {
  color: var(--dx-g-text-body-color);
  font-family: var(--dx-g-font-sans);
  font-size: var(--dx-g-text-base);
  letter-spacing: 0;
  line-height: 24px;
}

.dx-text-body-3 {
  color: var(--dx-g-text-body-color);
  font-family: var(--dx-g-font-sans);
  font-size: var(--dx-g-text-sm);
  letter-spacing: 0;
  line-height: 20px;
}

.dx-text-body-4 {
  color: var(--dx-g-text-body-color);
  font-family: var(--dx-g-font-sans);
  font-size: var(--dx-g-text-xs);
  letter-spacing: 0;
  line-height: 18px;
}

.dx-text-button-brand {
  color: var(--dx-g-text-button-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-sm);
  letter-spacing: 0;
  line-height: 20px;
}

.dx-text-button-light {
  color: var(--dx-g-text-button-light-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-sm);
  letter-spacing: 0;
  line-height: 20px;
}

.dx-text-label-1 {
  color: var(--dx-g-text-heading-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-sm);
  letter-spacing: 0.7px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
}

.dx-text-label-1-dark {
  color: var(--dx-g-text-label-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-sm);
  letter-spacing: 0.7px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
}

.dx-text-label-2 {
  color: var(--dx-g-text-heading-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-xs);
  letter-spacing: 0.7px;
  line-height: 16px;
  text-transform: uppercase;
}

.dx-text-label-3 {
  color: var(--dx-g-text-label-color);
  font-family: var(--dx-g-font-display);
  font-size: var(--dx-g-text-xs);
  font-weight: var(--dx-g-font-demi);
  letter-spacing: 0.7px;
  line-height: 16px;
  text-transform: uppercase;
}

.dx-text-form-error-message {
  font-family: var(--dx-g-font-sans);
  color: var(--dx-g-red-vibrant-50);
  font-size: var(--dx-g-text-xs);
  line-height: 14px;
}

.dx-theme-dark .token.punctuation {
  color: var(--dx-g-blue-vibrant-90);
}

.dx-theme-dark .token.property {
  color: var(--dx-g-cloud-blue-vibrant-70);
}

.dx-theme-dark .token.keyword {
  color: var(--dx-g-purple-vibrant-70);
}

.dx-theme-dark .token.comment {
  color: var(--dx-g-blue-vibrant-80);
}

.dx-theme-dark .token.selector {
  color: var(--dx-g-teal-vibrant-70);
}

.dx-theme-dark .token.operator {
  color: var(--dx-g-pink-vibrant-65);
}

.dx-theme-dark .token.function {
  color: var(--dx-g-yellow-vibrant-80);
}

.dx-theme-dark .token.variable {
  color: var(--dx-g-orange-vibrant-70);
}

.dx-theme-dark .token.prolog {
  color: #93a1a1;
}

.dx-theme-dark .token.doctype {
  color: var(--dx-g-blue-vibrant-80);
}

.dx-theme-dark .token.cdata {
  color: #93a1a1;
}

.dx-theme-dark .token.tag {
  color: var(--dx-g-cloud-blue-vibrant-70);
}

.dx-theme-dark .token.attr-name {
  color: var(--dx-g-teal-vibrant-70);
}

.dx-theme-dark .token.attr-value {
  color: var(--dx-g-purple-vibrant-70);
}

.dx-theme-dark .token.entity {
  color: #fff;
  background: var(--dx-g-blue-vibrant-10);
}

.dx-theme-dark .token.url {
  color: #fff;
  background: var(--dx-g-blue-vibrant-10);
}

.dx-theme-dark .token.regex, .dx-theme-dark .token.deleted, .dx-theme-dark .token.constant, .dx-theme-dark .token.number, .dx-theme-dark .token.builtin, .dx-theme-dark .token.important .dx-theme-dark .token.boolean, .dx-theme-dark .token.symbol, .dx-theme-dark .token.inserted, .dx-theme-dark .token.char, .dx-theme-dark .token.string {
  color: #fff;
}

.dx-theme-dark .language-css .token.string {
  color: #fff;
  background: var(--dx-g-blue-vibrant-10);
}

.dx-theme-dark .style .token.string {
  color: #fff;
  background: var(--dx-g-blue-vibrant-10);
}

.dx-theme-light .token.comment {
  color: #706e6b;
}

.dx-theme-light .token.punctuation {
  color: var(--dx-g-blue-vibrant-10);
}

.dx-theme-light .token.keyword {
  color: var(--dx-g-pink-vibrant-40);
}

.dx-theme-light .token.variable {
  color: var(--dx-g-hot-orange-vibrant-40);
}

.dx-theme-light .token.operator {
  color: var(--dx-g-green-vibrant-50);
}

.dx-theme-light .token.property {
  color: var(--dx-g-indigo-vibrant-40);
}

.dx-theme-light .token.selector {
  color: var(--dx-g-blue-vibrant-40);
}

.dx-theme-light .token.function {
  color: var(--dx-g-teal-vibrant-40);
}

.dx-theme-light .token.tag {
  color: rgb(75, 36, 219);
}

.dx-theme-light .token.attr-name {
  color: rgb(0, 107, 102);
}

.dx-theme-light .token.attr-value {
  color: rgb(204, 0, 96);
}

.dx-theme-light .token.doctype {
  color: rgb(0, 114, 215);
}

.dx-theme-light .token.prolog, .dx-theme-light .token.cdata, .dx-theme-light .token.boolean, .dx-theme-light .token.number, .dx-theme-light .token.constant, .dx-theme-light .token.symbol, .dx-theme-light .token.deleted, .dx-theme-light .token.string, .dx-theme-light .token.char, .dx-theme-light .token.builtin, .dx-theme-light .token.inserted, .dx-theme-light .token.atrule, .dx-theme-light .token.regex, .dx-theme-light .token.important {
  color: var(--dx-g-gray-10);
}

.dx-theme-light .token.entity, .dx-theme-light .token.url, .dx-theme-light .language-css .token.string, .dx-theme-light .style .token.string {
  color: var(--dx-g-gray-10);
  background: var(--dx-g-gray-95);
}

pre {
  margin: 0 !important;
}

.copyta {
  height: 0;
  position: absolute;
  opacity: 0;
  width: 0;
}

.toolbar {
  border-radius: 0.3em 0.3em 0 0;
  opacity: 1;
  display: flex;
  align-items: center;
  height: 40px;
}

.dx-theme-light .toolbar {
  background-color: var(--dx-g-gray-90);
}

.dx-theme-dark .toolbar {
  background-color: var(--dx-g-blue-natural-20);
}

.dx-theme-dark .divider {
  border-left-color: var(--dx-g-blue-vibrant-40);
}

.dx-theme-light .divider {
  border-left-color: #dddbda;
}

.dx-code-block-heading {
  padding-left: var(--dx-g-spacing-mlg);
  transform: translateY(3px);
}

.dx-theme-light .dx-code-block-heading {
  color: var(--dx-g-blue-vibrant-20) !important;
}

.dx-theme-dark .dx-code-block-heading {
  color: white !important;
}

.toolbar-item {
  display: inline-block;
}

.toolbar-item:first-child {
  flex-basis: 95%;
}

.dx-theme-dark .btn {
  --dx-c-button-primary-color: #fff;
  --dx-c-button-primary-color-hover: var(--dx-g-blue-natural-10);
  --dx-c-button-secondary-color-hover: var(--dx-g-blue-vibrant-30);
  --dx-c-button-custom-color: #fff;
  --dx-c-button-custom-color-hover: #fff;
  --dx-c-button-custom-background-hover: var(--dx-g-blue-natural-10);
}

.dx-theme-light .btn {
  --dx-c-button-primary-color: var(--dx-g-blue-vibrant-20);
  --dx-c-button-primary-color-hover: var(--dx-g-gray-60);
  --dx-c-button-secondary-color-hover: #dddbda;
  --dx-c-button-custom-color: var(--dx-g-blue-vibrant-20);
  --dx-c-button-custom-color-hover: var(--dx-g-blue-vibrant-20);
  --dx-c-button-custom-background-hover: var(--dx-g-gray-60);
}

div.code-block-content {
  border-radius: 0 0 0.3em 0.3em;
  overflow-y: auto;
}

.dx-theme-dark div.code-block-content {
  background: var(--dx-g-blue-vibrant-10);
}

.dx-theme-light div.code-block-content {
  background: var(--dx-g-gray-95);
}

code {
  margin-left: -11px;
}

.toolbar-item:not(:first-of-type) {
  margin-right: var(--dx-g-spacing-xs);
}

pre {
  border-radius: 0 0 0.3em 0.3em;
  padding-bottom: var(--dx-g-spacing-smd);
  background-color: unset;
  padding-top: var(--dx-g-spacing-sm);
}

pre.line-numbers {
  padding-left: 56px;
}

@media screen and (max-width: 640px) {
  .dx-code-block-heading {
    display: none;
  }
}
</style>
