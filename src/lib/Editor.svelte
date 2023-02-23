<script lang="ts">
    import {
        $createParagraphNode as createParagraphNode,
        $createTextNode as createTextNode,
        $getRoot as getRoot,
        $getSelection as getSelection,
        //type EditorConfig,
        type EditorThemeClasses,
        type LexicalEditor,
		type LexicalNode
    } from 'lexical';

    import { onMount } from 'svelte';
    import { createEditor } from 'lexical';
    import { registerRichText } from '@lexical/rich-text';
    import { registerLexicalTextEntity } from '@lexical/text';
    import { setContext } from 'svelte';

    import { key } from './editor';

    export let theme: EditorThemeClasses = {
        placeholder: 'placeholder',
        mediaNode: 'mediaNode'
    };

    export let editor: LexicalEditor;
    export let nodes//EditorConfig["nodes"]//Parameters<typeof createEditor>["nodes"];

    const editorConfig = {
        namespace: 'wips_editor',
        theme,
        onerror: console.error,
        editable: true,
        nodes
    };

    editor = createEditor(editorConfig);
    let editorElement: HTMLElement;

    setContext(key, editor);
    registerRichText(editor);

    onMount(() => {
        editor.setRootElement(editorElement);

        editor.update(() => {
            const root = getRoot();
            const selection = getSelection();

            const paragraphNode = createParagraphNode();
            const text = createTextNode('wips');

            paragraphNode.append(text);
            root.append(paragraphNode);
        });
    });
</script>

<div placeholder="wips" bind:this={editorElement} contenteditable={true} />
<slot/>

<style>
    div {
        background-color: yellow;
    }
</style>
