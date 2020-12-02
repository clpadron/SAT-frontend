<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template functional>
  <footer :class="classes" class="the-footer flex-wrap justify-between">
    <span class="md:flex text-xs hidden items-center">
      Smart Electronic System for Tracking Apprenticeships (Apprentice Track)<br />
      Project Ref: 2017-1-SI01-KA203-035576 <br />This project has been funded
      with support from the European Commission
    </span>
    <span class="md:flex hidden items-center">
      <img
        src="@/assets/images/common/eu_flag.jpg"
        height="60"
        class="float-right "
      />
    </span>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  props: {
    classes: {
      type: String
    }
  }
}
</script>
