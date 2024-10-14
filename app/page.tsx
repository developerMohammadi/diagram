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

// داده‌های فیک شرکت‌ها
const companyData = [
    { name: 'FakeCorp', years: 10, employees: 200 },
    { name: 'Techify', years: 5, employees: 80 },
    { name: 'InnovateX', years: 15, employees: 350 },
    { name: 'StartUpOne', years: 2, employees: 20 },
    { name: 'NextGenTech', years: 7, employees: 150 },
    { name: 'AlphaSolutions', years: 12, employees: 300 },
];

// ساخت نودها با استفاده از اطلاعات شرکت‌ها
const initialNodes: Node[] = companyData.map((company, index) => ({
    id: (index + 1).toString(),
    type: 'default',
    data: {
        label: (
            <div>
                <strong>{company.name}</strong>
                <div>Years of Experience: {company.years}</div>
                <div>Employees: {company.employees}</div>
            </div>
        ),
    },
    position: { x: 150 * (index + 1), y: 150 * (index % 2 === 0 ? 1 : 2) }, // موقعیت کارت‌ها در صفحه
}));

// ساخت لبه‌ها برای اتصال سه نود
const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true },
];

export default function Diagram() {
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
                onConnect={onConnect}
                fitView
            >
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
}
