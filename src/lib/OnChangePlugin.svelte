<script lang="ts">
    //ref: https://github.com/facebook/lexical/blob/main/packages/lexical-react/src/LexicalOnChangePlugin.ts
    import type { EditorState, LexicalEditor } from 'lexical';
    import { getContext } from 'svelte';
    import { key } from './editor';

    const editor: LexicalEditor = getContext(key);

    export let onChange: (editorState: EditorState, editor: LexicalEditor) => void;
    export let ignoreSelectionChange: boolean = false;
    export let ignoreHistoryMergeTagChange: boolean = false;

    editor.registerUpdateListener(
        ({ editorState, dirtyElements, dirtyLeaves, prevEditorState, tags }) => {
            if (
                (ignoreSelectionChange && dirtyElements.size === 0 && dirtyLeaves.size === 0) ||
                (ignoreHistoryMergeTagChange && tags.has('history-merge')) ||
                prevEditorState.isEmpty()
            ) {
                return;
            }

            onChange(editorState, editor);
        }
    );
</script>
