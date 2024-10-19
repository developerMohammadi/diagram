import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalProps} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {useState} from "react";
import {CardProps} from "./page";

interface OpenModalProps extends ModalProps{
    Add:(items:CardProps)=>void;
}

const AddModal=({Add,...props}:OpenModalProps) =>{

    const [card, setCard] = useState<CardProps | null>(null);

    return (
        <>

            <Modal {...props} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
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
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary"
                                        onClick={()=>{
                                            if (card) Add(card)
                                            onClose()
                                            setCard(null)
                                        }}

                                >
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
export default AddModal