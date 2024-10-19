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

import {Button, useDisclosure} from "@nextui-org/react";

import { deleteNode, isNodeSelected } from '@/app/nodeDelete.service';
import { initialCompanyData } from "@/app/data";
import AddModal from "@/app/add.modal";

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', style: { strokeDasharray: '5,5' } },
    { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { strokeDasharray: '5,5' } },
];

export interface CardProps {
    name?: string;
    years?: string;
    employees?: string;
}

export default function Home() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();


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
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, type: 'bezier' }, eds)),
        [setEdges]
    );

    const handleAddCompany = (items:CardProps) => {
        const newNode: Node = {
            id: (nodes.length + 1).toString(),
            type: 'default',
            data: {
                label: (
                    <div>
                        <strong>{items.name}</strong>
                        <div>Years of Experience: {items.years}</div>
                        <div>Employees: {items.employees}</div>
                    </div>
                ),
            },
            position: { x: 150 * (nodes.length + 1), y: 150 },
        };

        setNodes((nds) => nds.concat(newNode));
    };
    const handleDeleteNode = () => {
        const updatedNodes = deleteNode(nodes, selectedNodeId);
        setNodes(updatedNodes);
        setSelectedNodeId(null);
    };


    return (
        <div className={'h-screen p-4'}>

            <div className={'w-full bg-[#99AABB]'}>
                <div className={'w-96 h-72 p-8'}>
                    <div><Button onPress={onOpen} color={'primary'}>Add Company</Button></div>
                    <div>
                        <Button color={'danger'} onClick={handleDeleteNode}
                                isDisabled={!isNodeSelected(selectedNodeId)}>Delete Selected Company</Button>
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
                <Controls/>
                <Background color="#99AABB" gap={16}/>
            </ReactFlow>

            <AddModal isOpen={isOpen} onOpenChange={onOpenChange} Add={(items) => handleAddCompany(items)}>
                <></>
            </AddModal>

        </div>
    );
}
