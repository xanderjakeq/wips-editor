import type { ComponentProps, SvelteComponent } from 'svelte';
import {
    DecoratorNode,
    type LexicalNode,
    type EditorConfig,
    type LexicalEditor,
    type NodeKey,
    type SerializedLexicalNode
} from 'lexical';
import MediaNodeComponent from './MediaNode.svelte';
import MediaUploadComponent from './MediaUpload.svelte';

type DecoratorImageType = {
    componentClass: typeof SvelteComponent;
    props: ComponentProps<MediaNodeComponent | MediaUploadComponent>;
};

type SerializedMediaNode = {
    type: string;
    upload: boolean;
    url: string;
    version: number;
};

export class MediaNode extends DecoratorNode<DecoratorImageType> {
    __upload: boolean;
    __url: string;

    static getType(): string {
        return 'media_node';
    }

    static clone(node: MediaNode): MediaNode {
        return new MediaNode({
            key: node.__key,
            upload: node.__upload,
            url: node.__url
        });
    }

    constructor({
        key,
        upload = false,
        url = ''
    }: {
        key?: NodeKey;
        upload?: boolean;
        url?: string;
    }) {
        super(key);
        this.__upload = upload;
        this.__url = url;
    }

    createDOM(config: EditorConfig, _editor: LexicalEditor): HTMLElement {
        const element = document.createElement('div');
        console.log('dom created');
        element.classList.add(config.theme.media || 'media_node');
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

    static importJSON(node: SerializedMediaNode): MediaNode {
        const mediaNode = $createMediaNode(node.url);
        return mediaNode;
    }

    exportJSON(): SerializedMediaNode {
        return {
            //...super.exportJSON(),
            type: this.getType(),
            url: this.__url,
            upload: this.__upload,
            version: 1
        };
    }
}

export function $createMediaNode(url: string): MediaNode {
    return new MediaNode({ url });
}

export function $createMediaUploadNode(): MediaNode {
    return new MediaNode({ upload: true });
}

export function $isMediaNode(node?: LexicalNode): boolean {
    return node instanceof MediaNode;
}
