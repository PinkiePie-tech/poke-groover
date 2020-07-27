<template>
  <div>
    <span> Slot {{ compSlot }} : {{ compName }} </span>
  </div>
</template>

<script>
export default {
  props: {
    compName: {
      type: String,
      required: true
    },
    compSlot: {
      type: Number,
      required: true
    }
  }
}
</script>
