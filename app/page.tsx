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

const initialCompanyData = [
    { name: 'FakeCorp', years: 10, employees: 200 },
    { name: 'Techify', years: 5, employees: 80 },
    { name: 'InnovateX', years: 15, employees: 350 },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', style: { strokeDasharray: '5,5' } },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { strokeDasharray: '5,5' } },
];

export default function Diagram() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialCompanyData.map((company, index) => ({
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
        position: { x: 150 * (index + 1), y: 150 * (index % 2 === 0 ? 1 : 2) },
    })));

    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [name, setName] = useState('');
    const [years, setYears] = useState('');
    const [employees, setEmployees] = useState('');

    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, type: 'bezier' }, eds)),
        [setEdges]
    );

    const addNode = () => {
        if (name && years && employees) {
            const newNode: Node = {
                id: (nodes.length + 1).toString(),
                type: 'default',
                data: {
                    label: (
                        <div>
                            <strong>{name}</strong>
                            <div>Years of Experience: {years}</div>
                            <div>Employees: {employees}</div>
                        </div>
                    ),
                },
                position: { x: 150 * (nodes.length + 1), y: 150 },
            };

            setNodes((nds) => nds.concat(newNode));

            setName('');
            setYears('');
            setEmployees('');
        }
    };

    const deleteNode = () => {
        if (selectedNodeId) {
            setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
            setSelectedNodeId(null);
        }
    };

    return (
        <div style={{ height: '100vh' }}>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Years of Experience"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Number of Employees"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                />
                <button onClick={addNode}>Add Company</button>

                <div>
                    <button onClick={deleteNode} disabled={!selectedNodeId}>Delete Selected Company</button>
                </div>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                onNodeClick={(event, node) => {
                    setSelectedNodeId(node.id);
                }}
            >
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
}
