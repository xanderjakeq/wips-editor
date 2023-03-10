import type { ComponentProps, SvelteComponent } from 'svelte';
import {
    DecoratorNode,
    type LexicalNode,
    type EditorConfig,
    type LexicalEditor,
    type NodeKey,
    type SerializedLexicalNode
} from 'lexical';
import AutoLinkComponent from './AutoLinkNode.svelte';

type DecoratorType = {
    componentClass: typeof SvelteComponent;
    props: ComponentProps<AutoLinkComponent>;
};

type SerializedMediaNode = {
    type: string;
    url: string;
    version: number;
};

export class AutoLinkNode extends DecoratorNode<DecoratorType> {
    __url: string;

    static getType(): string {
        return 'auto_link_node';
    }

    static clone(node: AutoLinkNode): AutoLinkNode {
        return new AutoLinkNode({
            key: node.__key,
            url: node.__url
        });
    }

    constructor({ key, url }: { key?: NodeKey; url: string }) {
        super(key);
        this.__url = url;
    }

    createDOM(config: EditorConfig, _editor: LexicalEditor): HTMLElement {
        const element = document.createElement('div');
        console.log('dom created');
        element.classList.add(config.theme.media || this.getType());
        element.style.display = 'contents';
        return element;
    }

    updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
        return false;
    }

    decorate(editor: LexicalEditor, config: EditorConfig): DecoratorType {
        return {
            componentClass: AutoLinkComponent,
            //NOTE: props that svelte components get with `export let props`
            props: {
                url: this.__url,
                nodeKey: this.__key
            }
        };
    }

    static importJSON(node: SerializedMediaNode): AutoLinkNode {
        const mediaNode = $createAutoLinkNode(node.url);
        return mediaNode;
    }

    exportJSON(): SerializedMediaNode {
        return {
            //...super.exportJSON(),
            type: this.getType(),
            url: this.__url,
            version: 1
        };
    }
}

export function $createAutoLinkNode(url: string): AutoLinkNode {
    return new AutoLinkNode({ url });
}

export function $isAutoLinkNode(node?: LexicalNode): boolean {
    return node instanceof AutoLinkNode;
}
