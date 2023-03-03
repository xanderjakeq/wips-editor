<script context="module" lang="ts">
    export type RENDER_MEDIA_NODES_COMMAND_Payload = {
        urls: string[];
        uploadNodeKey: string;
    };
    export const RENDER_MEDIA_NODES_COMMAND = createCommand<RENDER_MEDIA_NODES_COMMAND_Payload>();

    //use zod to validate these things??
</script>

<script lang="ts">
    //ref: https://github.com/facebook/lexical/blob/main/packages/lexical-react/src/LexicalClearEditorPlugin.ts
    import {
        $getRoot as getRoot,
        $insertNodes as insertNodes,
        //$createParagraphNode as createParagraphNode,
        //$getRoot as getRoot,
        //$getSelection as getSelection,
        //CLEAR_EDITOR_COMMAND,
        type LexicalEditor,
        COMMAND_PRIORITY_EDITOR,
        DecoratorNode,
        createCommand,
        $getNodeByKey as getNodeByKey,
        $nodesOfType as nodesOfType
    } from 'lexical';
    import { mergeRegister } from '@lexical/utils';
    import { getContext } from 'svelte';
    import { key } from './editor';
    import {
        $createMediaNode as createMediaNode,
        $createMediaUploadNode as createMediaUploadNode
    } from './MediaNode';
    import { onMount } from 'svelte';
    import { MediaNode } from './MediaNode';
    import MediaNodeComponent from './MediaNode.svelte';
    import MediaUploadComponent from './MediaUpload.svelte';

    const editor: LexicalEditor = getContext(key);

    editor.registerCommand(
        RENDER_MEDIA_NODES_COMMAND,
        (payload: RENDER_MEDIA_NODES_COMMAND_Payload) => {
            console.log('render media nodes payload', payload);
            editor.update(() => {
                const root = getRoot();
                const selection = getSelection();

                const mediaNodes = payload.urls.map((url) => {
                    return createMediaNode(url, url);
                });

                insertNodes(mediaNodes);

                const mediaNode = getNodeByKey(payload.uploadNodeKey);
                mediaNode?.remove();

                if (selection != null) {
                    //paragraph.select();
                }
            });
            return true;
        },
        COMMAND_PRIORITY_EDITOR
    );

    const removeMutationListener = editor.registerMutationListener(MediaNode, (mutatedNodes) => {
        // mutatedNodes is a Map where each key is the NodeKey, and the value is the state of mutation.
        for (let [nodeKey, mutation] of mutatedNodes) {
            console.log(nodeKey, mutation);
            const state = editor.getEditorState();
            state.read(() => {
                const nodes = nodesOfType(MediaNode)
                // why other nodes get updated??? BRB
                console.log(nodes)
            })
        }
    });

    // Do not forget to unregister the listener when no longer needed!

    //TODO: remove later
    editor.update(() => {
        const root = getRoot();
        const mediaNode = createMediaUploadNode('upload_media');
        insertNodes([mediaNode]);

        root.append(mediaNode);
    });
    onMount(() => {
        if (!editor.hasNodes([MediaNode])) {
            throw new Error('MediaNodePlugin: Media node not registered to editor');
        }
        () => {
            removeMutationListener();
        };
    });
</script>
