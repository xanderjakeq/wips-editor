<script lang="ts">
    import type { LexicalEditor } from 'lexical';

    import { getContext } from 'svelte';
    import { key } from './editor';
    import { RENDER_MEDIA_NODES_COMMAND } from './MediaNodePlugin.svelte';

    export let nodeKey: string;

    let input: HTMLInputElement;
    let tempURLs: string[] = [];

    const editor: LexicalEditor = getContext(key);

    const handleInputChange = (event: Event) => {
        let files = (event.target as HTMLInputElement)?.files;

        if (!files) {
            return;
        }

        for (let i = 0; i < files.length; i++) {
            let item = files.item(i);
            if (item) {
                tempURLs.push(URL.createObjectURL(item));
                tempURLs = tempURLs;
            }
        }

        editor.dispatchCommand(RENDER_MEDIA_NODES_COMMAND, {
            urls: tempURLs,
            uploadNodeKey: nodeKey
        });
        //dispatch command render media
    };

    //TODO:
    //render images to editor
    //handle upload, with aditional metadata { width, height}
    //create separate "ImageNodes??"
</script>

<div>
    <input bind:this={input} type="file" accept="image/*" multiple on:change={handleInputChange} />
    <button
        on:click={() => {
            input.click();
        }}
    >
        <img src="#" />
    </button>
</div>

<style>
    input {
        display: none;
    }
</style>
