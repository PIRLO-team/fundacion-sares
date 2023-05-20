// Chakra UI
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

// Hooks
import { useForm, useNoConsumiblesStore } from '@/hooks';

// UI Local Components
import { Button, Input, Select } from '@/components/ui';

// Styles
import s from '../styles/NoConsumibles.module.scss';

export default function NoConsumibleCategoryModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { startCreatingCategory } = useNoConsumiblesStore();

  const { formState, onResetForm, onInputChange } = useForm({
    non_consumable_category_supply_name: '',
    non_consumable_status_id: '',
  });

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await startCreatingCategory(formState);

    handleClearForm();
  };

  // Clear form
  const handleClearForm = () => {
    onResetForm();
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className={s.noConsumibles__createNoConsumible__button}
      >
        Crear categoria
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          handleClearForm();
        }}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit} autoComplete="off">
          <ModalContent>
            <ModalHeader>Nueva categoria</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                title="Nombre de la categoria"
                name="non_consumable_category_supply_name"
                type="text"
                value={formState?.non_consumable_category_supply_name}
                maxLength={50}
                onChange={onInputChange}
                inputType="secondary"
                placeholder="Nombre de la categoria"
              />

              <Select
                SelectType="secondary"
                title="Se esteriliza?"
                name="non_consumable_status_id"
                value={formState?.non_consumable_status_id}
                onChange={onInputChange}
              >
                <option value="">-- Elegir un estado --</option>
                <option value="1">SI</option>
                <option value="2">NO</option>
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button
                type="button"
                buttonType="secondary"
                style={{
                  marginRight: '0.5rem',
                }}
                onClick={handleClearForm}
                className={s.noConsumibles__createNoConsumible__button__cancel}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                style={{
                  fontSize: '0.875rem',
                }}
                className={s.noConsumibles__createNoConsumible__button__create}
              >
                Añadir categoria
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
