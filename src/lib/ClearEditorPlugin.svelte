<script lang="ts">
    //ref: https://github.com/facebook/lexical/blob/main/packages/lexical-react/src/LexicalClearEditorPlugin.ts
    import {
        $createParagraphNode as createParagraphNode,
        $getRoot as getRoot,
        $getSelection as getSelection,
        CLEAR_EDITOR_COMMAND,
        COMMAND_PRIORITY_EDITOR,
        type LexicalEditor
    } from 'lexical';
    import { getContext } from 'svelte';
    import { key } from './editor';

    const editor: LexicalEditor = getContext(key);

    export const clear = () => editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    export let onClear: () => void;

    editor.registerCommand(
        CLEAR_EDITOR_COMMAND,
        (_payload) => {
            editor.update(() => {
                const root = getRoot();
                const selection = getSelection();
                const paragraph = createParagraphNode();

                root.clear();
                root.append(paragraph);

                if (selection != null) {
                    paragraph.select();
                }
                onClear();
            });
            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );
</script>
