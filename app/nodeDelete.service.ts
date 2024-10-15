import { Node } from 'react-flow-renderer';


export const deleteNode = (nodes: Node[], selectedNodeId: string | null): Node[] => {
    if (!selectedNodeId) return nodes;

    return nodes.filter((node) => node.id !== selectedNodeId);
};


export const isNodeSelected = (selectedNodeId: string | null): boolean => {
    return selectedNodeId !== null;
};
