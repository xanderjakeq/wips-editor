import type { ComponentProps, SvelteComponent } from 'svelte';
import {
    DecoratorNode,
    type LexicalNode,
    type EditorConfig,
    type LexicalEditor,
    type NodeKey
} from 'lexical';
import MediaNodeComponent from './MediaNode.svelte';

type DecoratorImageType = {
  componentClass: typeof SvelteComponent;
  props: ComponentProps<MediaNodeComponent>;
};

export class MediaNode extends DecoratorNode<DecoratorImageType> {
    __id: string;

    static getType(): string {
        return 'media_node';
    }

    static clone(node: MediaNode): MediaNode {
        return new MediaNode(node.__id, node.__key);
    }

    constructor(id: string, key?: NodeKey) {
        super(key);
        this.__id = id;
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
            componentClass: MediaNodeComponent,
            props: {}
        };
    }
}

export function $createMediaNode(id: string): MediaNode {
    return new MediaNode(id);
}

export function $isMediaNode(node?: LexicalNode): boolean {
    return node instanceof MediaNode;
}
