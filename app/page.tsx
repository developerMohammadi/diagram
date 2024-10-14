'use client'
import { useState } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    Position,
    addEdge,
} from 'react-flow-renderer';

interface DepartmentNode extends Node {
    id: string;
    data: { label: string };
    position: { x: number; y: number };
}

interface DepartmentEdge extends Edge {
    id: string;
    source: string;
    target: string;
    type: string;
    animated: boolean;
}

const initialNodes: DepartmentNode[] = [
    { id: '1', type: 'input', data: { label: 'Company' }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Department 1' }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'Department 2' }, position: { x: 400, y: 100 } },
];

const initialEdges: DepartmentEdge[] = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
    { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', animated: true },
];

export default function Home() {
    const [nodes, setNodes] = useState<DepartmentNode[]>(initialNodes);
    const [edges, setEdges] = useState<DepartmentEdge[]>(initialEdges);

    const onElementClick = (event: React.MouseEvent, element: DepartmentNode | DepartmentEdge) => {
        console.log('Clicked element:', element);
    };

    const addDepartment = () => {
        const newId = (nodes.length + 1).toString();
        const newDepartment: DepartmentNode = {
            id: newId,
            data: { label: `Department ${newId}` },
            position: { x: Math.random() * 400, y: Math.random() * 400 },
        };
        const newConnection: DepartmentEdge = {
            id: `e1-${newId}`,
            source: '1',
            target: newId,
            type: 'smoothstep',
            animated: true,
        };
        setNodes((nds) => [...nds, newDepartment]);
        setEdges((eds) => [...eds, newConnection]);
    };

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={onElementClick}
                onEdgeClick={onElementClick}
            >
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
            <button onClick={addDepartment} style={{ position: 'absolute', top: 10, right: 10 }}>
                Add Department
            </button>
        </div>
    );
}