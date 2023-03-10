<script lang="ts">
    //ref: https://github.com/facebook/lexical/blob/main/packages/lexical-playground/src/plugins/AutoLinkPlugin/index.tsx
    import {
        type LexicalEditor,
        TextNode,
    } from 'lexical';
    import { getContext, onDestroy } from 'svelte';
    import { key } from './editor';
    import { AutoLinkNode, $createAutoLinkNode as createAutoLinkNode } from './AutoLinkNode';

    const editor: LexicalEditor = getContext(key);

    if (!editor.hasNodes([AutoLinkNode])) {
        throw new Error('AutoLinkPlugin: AutoLink node not registered to editor');
    }

    const URL_MATCHER =
        /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    editor.registerNodeTransform(TextNode, (textnode) => {
        const content = textnode.getTextContent();
        if (URL_MATCHER.test(content)) {
            textnode.replace(createAutoLinkNode(content));
        }
    });

    onDestroy(() => {});
</script>
