<script lang="ts">
    export let url: string;
    export let alt: string;
</script>

<img src={url} {alt} />

<style>
    img {
        width: 100%;
    }
</style>
