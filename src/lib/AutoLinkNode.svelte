<script lang="ts">
    export let url: string;
    export let text: string;
</script>

<a href={url}>
    {text || url}
</a>
