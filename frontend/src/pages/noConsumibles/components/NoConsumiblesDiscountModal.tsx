// Chakra UI
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

// Sonner notification
import { toast } from 'sonner';

// Hooks
import { useForm, useNoConsumiblesStore } from '@/hooks';

// UI Local Components
import { Select, Button } from '@/components/ui';

// Styles
import s from '../styles/NoConsumibles.module.scss';

export default function InsumosDiscountModal({
  isOpen,
  onClose,
  noConsumible,
}: {
  isOpen: boolean;
  onClose: () => void;
  noConsumible: {
    non_consumable_id: string;
  };
}) {
  const { startDiscountNoConsumible } = useNoConsumiblesStore();

  const { discount_type_id, formState, onResetForm, onInputChange } = useForm({
    discount_type_id: '',
  });

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (discount_type_id === '') {
      toast.error('El motivo de descuento es obligatorio');
      return;
    }

    startDiscountNoConsumible(
      noConsumible.non_consumable_id,
      Number(discount_type_id)
    );

    console.log(formState);

    onClose();
  };

  // Clear form
  const handleClearForm = () => {
    onResetForm();
    onClose();
  };

  return (
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
          <ModalHeader>Descontar noConsumible</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              SelectType="secondary"
              title="Motivo de descuento"
              name="discount_type_id"
              value={formState?.discount_type_id}
              onChange={onInputChange}
            >
              <option value="">-- Elegir un motivo --</option>
              <option value="1">Por donaci&oacute;n</option>
              <option value="2">Por formaci&oacute;n</option>
              <option value="3">Por perdida</option>
              <option value="5">Mal estado</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              style={{
                marginRight: '1rem',
                fontSize: '0.875rem',
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
              Descontar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
