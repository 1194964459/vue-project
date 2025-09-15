<template>
    <div>子组件</div>
</template>
<script lang="ts">
interface Props{
    foo: string,
    bar?: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>