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
import { Button, Input } from "@nextui-org/react";
import { deleteNode, isNodeSelected } from '@/app/nodeDelete.service';
import {initialCompanyData} from "@/app/data";



const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', style: { strokeDasharray: '5,5' } },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { strokeDasharray: '5,5' } },
];

interface CardProps {
    name?: string;
    years?: string;
    employees?: string;
}

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

    const [card, setCard] = useState<CardProps | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, type: 'bezier' }, eds)),
        [setEdges]
    );

    const addNode = () => {
        if (card?.name && card?.years && card?.employees) {
            const newNode: Node = {
                id: (nodes.length + 1).toString(),
                type: 'default',
                data: {
                    label: (
                        <div>
                            <strong>{card.name}</strong>
                            <div>Years of Experience: {card.years}</div>
                            <div>Employees: {card.employees}</div>
                        </div>
                    ),
                },
                position: { x: 150 * (nodes.length + 1), y: 150 },
            };

            setNodes((nds) => nds.concat(newNode));
        }
    };

    const handleDeleteNode = () => {
        const updatedNodes = deleteNode(nodes, selectedNodeId); // استفاده از سرویس حذف
        setNodes(updatedNodes);
        setSelectedNodeId(null);
    };

    return (
        <div className={'h-screen p-4 '}>
            <div className={'w-full bg-[#99AABB]'}>
                <div className={'mb-4 w-96 h-72 flex flex-col gap-2.5 justify-center pl-3'}>
                    <Input
                        className={'w-full'}
                        type="text"
                        placeholder="Company Name"
                        value={card?.name || ''}
                        onChange={(e) => setCard({ ...card, name: e.target.value })}
                    />
                    <Input
                        type="number"
                        placeholder="Years of Experience"
                        value={card?.years || ''}
                        onChange={(e) => setCard({ ...card, years: e.target.value })}
                    />
                    <Input
                        type="number"
                        placeholder="Number of Employees"
                        value={card?.employees || ''}
                        onChange={(e) => setCard({ ...card, employees: e.target.value })}
                    />
                    <Button color={'primary'} onClick={addNode} isDisabled={!(card?.name && card.employees && card.years)}>Add Company</Button>

                    <div>
                        <Button className={'w-full'} color={'danger'} onClick={handleDeleteNode} isDisabled={!isNodeSelected(selectedNodeId)}>
                            Delete Selected Company
                        </Button>
                    </div>
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
                <Background color="#99AABB" gap={16} />
            </ReactFlow>
        </div>
    );
}
