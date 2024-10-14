'use client'
import { useCallback, useState } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    Connection,
    Edge,
    Node,
    useEdgesState,
    useNodesState,
} from 'react-flow-renderer';

const initialNodes: Node[] = [
    { id: '1', type: 'default', data: { label: 'Card 1' }, position: { x: 100, y: 100 } },
    { id: '2', type: 'default', data: { label: 'Card 2' }, position: { x: 400, y: 100 } },
    { id: '3', type: 'default', data: { label: 'Card 3' }, position: { x: 250, y: 300 } },
];

const initialEdges: Edge[] = [];

export default function Home() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect} // برای ایجاد ارتباط بین نودها
                fitView
            >
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
}