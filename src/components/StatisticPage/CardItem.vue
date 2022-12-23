<template>
     <q-card-section>
            <div class="row">
                <div class="col-6"><img :src="item.IconUrl"/></div>
                <div class="col-6 text-right">
                    <div class="col-12">
                        <span class="text-h6"><q-icon name="arrow_forward" size="1.7rem" color="blue-14"></q-icon>{{item.TotalNumber}} {{item?.UnitExtension}}</span>
                    </div>
                    <div class="col-12">
                        <span style="font-weight:500">{{item.Title}}</span>
                    </div>
                </div>
            </div>

        </q-card-section>
        <q-separator inset></q-separator>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    }
  }
}
</script>
