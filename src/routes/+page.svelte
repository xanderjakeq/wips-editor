<script lang="ts">
    import type { LexicalEditor, EditorState, LexicalNode, EditorConfig } from '$lib/index';

    import {
        Editor,
        OnChangePlugin,
        ClearEditorPlugin,
        MediaNode,
        MediaNodePlugin,
        AutoLinkNode,
        AutoLinkPlugin
    } from '$lib/index';
    import type { RegisteredNode } from 'lexical/LexicalEditor';
    import { onMount } from 'svelte';
    let editor: LexicalEditor;

    let clear: () => boolean;
    const onChange = (state: EditorState, editor: LexicalEditor) => {
        state.read(() => {
            //console.log("state read")
        });
        //editor.setEditorState;
    };

    const onClear = () => {
        console.log('cleared');
    };

    const theme = {
        placeholder: 'test'
    };

    const nodes = [MediaNode, AutoLinkNode];

    onMount(() => {});
    //can this be "server rendered"
</script>

<div class="bg">
    <h1>wips editor</h1>
    <button on:click={clear}>clear</button>
    <Editor bind:editor {theme} {nodes}>
        <OnChangePlugin {onChange} />
        <ClearEditorPlugin bind:clear {onClear} />
        <MediaNodePlugin />
        <AutoLinkPlugin />
    </Editor>
    <button
        on:click={() => {
            console.log(JSON.stringify(editor.getEditorState()));
        }}
    >
        log state
    </button>
</div>

<style>
    .bg {
        background-color: #6666a8;
        margin: 5rem;
        padding: 2rem;
    }
</style>
