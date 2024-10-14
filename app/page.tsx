'use client'
import { useState } from 'react';
import ReactFlow, {
    Elements,
    Controls,
    Background,
    Handle,
    addEdge,
    Connection,
    Edge,
    Node,
    Position,
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

const initialElements: (DepartmentNode | DepartmentEdge)[] = [
    { id: '1', type: 'input', data: { label: 'Company' }, position: { x: 250, y: 5 } },
    { id: '2', data: { label: 'Department 1' }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'Department 2' }, position: { x: 400, y: 100 } },
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
    { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', animated: true },
];

export default function Home() {
    const [elements, setElements] = useState<(DepartmentNode | DepartmentEdge)[]>(initialElements);

    const onElementClick = (event: React.MouseEvent, element: DepartmentNode | DepartmentEdge) => {
        console.log('Clicked element:', element);
    };

    const addDepartment = () => {
        const newId = (elements.length + 1).toString();
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
        setElements((els) => [...els, newDepartment, newConnection]);
    };

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow elements={elements} onElementClick={onElementClick}>
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
            <button onClick={addDepartment} style={{ position: 'absolute', top: 10, right: 10 }}>
                Add Department
            </button>
        </div>
    );
}