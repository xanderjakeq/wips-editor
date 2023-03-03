import type { ComponentProps, SvelteComponent } from 'svelte';
import {
    DecoratorNode,
    type LexicalNode,
    type EditorConfig,
    type LexicalEditor,
    type NodeKey
} from 'lexical';
import MediaNodeComponent from './MediaNode.svelte';
import MediaUploadComponent from './MediaUpload.svelte';

type DecoratorImageType = {
    componentClass: typeof SvelteComponent;
    props: ComponentProps<MediaNodeComponent | MediaUploadComponent>;
};

export class MediaNode extends DecoratorNode<DecoratorImageType> {
    __id: string;
    __upload: boolean;
    __url: string;

    static getType(): string {
        return 'media_node';
    }

    static clone(node: MediaNode): MediaNode {
        return new MediaNode({
            id: node.__id,
            key: node.__key,
            upload: node.__upload,
            url: node.__url
        });
    }

    constructor({
        id,
        key,
        upload = false,
        url = ''
    }: {
        id: string;
        key?: NodeKey;
        upload?: boolean;
        url?: string;
    }) {
        super(key);
        this.__id = id;
        this.__upload = upload;
        this.__url = url;
    }

    createDOM(config: EditorConfig, _editor: LexicalEditor): HTMLElement {
        const element = document.createElement('div');
        console.log('dom created');
        element.classList.add(config.theme.media || 'media_node');
        element.id = this.__id;
        element.style.display = 'contents';
        return element;
    }

    updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
        return false;
    }

    decorate(editor: LexicalEditor, config: EditorConfig): DecoratorImageType {
        return {
            componentClass: this.__upload ? MediaUploadComponent : MediaNodeComponent,
            //NOTE: props that svelte components get with `export let props`
            props: {
                url: this.__url,
                nodeKey: this.__key
            }
        };
    }
}

export function $createMediaNode(id: string, url: string): MediaNode {
    return new MediaNode({ id, url });
}

export function $createMediaUploadNode(id: string): MediaNode {
    return new MediaNode({ id, upload: true });
}

export function $isMediaNode(node?: LexicalNode): boolean {
    return node instanceof MediaNode;
}
