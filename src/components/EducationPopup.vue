<template>
     <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6" >First dialog</div>
        </q-card-section>
        <q-card-actions>
             <q-btn flat label="Cancel" color="primary" @click="$emit('closePopup')"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script setup>
const { defineProps } = require('@vue/reactivity')
const { ref } = require('@vue/reactivity')
const props = defineProps([
  'dialog'
])
const dialog = ref(props.dialog)
console.log(dialog)

</script>
