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

// hooks
import { useForm, useInsumosStore } from '@/hooks';

// UI Local Components
import { Button, Input, Select } from '@/components/ui';

// Styles
import s from '../styles/Insumos.module.scss';

export default function InsumosDiscountModal({
  isOpen,
  onClose,
  insumo,
}: {
  isOpen: boolean;
  onClose: () => void;
  insumo: any;
}) {
  const { startDiscountInsumo } = useInsumosStore();

  const { formState, onResetForm, onInputChange } = useForm({
    quantity: '',
    discount_type_id: '',
  });

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { quantity, discount_type_id } = formState;

    if (quantity === '') {
      toast.error('La cantidad es obligatoria');
      return;
    }

    if (discount_type_id === '') {
      toast.error('El motivo de descuento es obligatorio');
      return;
    }

    if (Number(quantity) > Number(insumo.stock)) {
      toast.error(
        'La cantidad a descontar no puede ser mayor a la cantidad actual'
      );
      return;
    }

    try {
      await startDiscountInsumo(insumo.supply_id, quantity, discount_type_id);

      onClose();
      handleClearForm();
    } catch (error) {
      console.log(error);
      onClose();
    }
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
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Descontar insumo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              title="Cantidad"
              name="quantity"
              type="number"
              value={formState?.quantity}
              onChange={onInputChange}
              inputType="secondary"
              placeholder="Cantidad"
            />

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
              className={s.insumos__createInsumo__button__cancel}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              style={{
                fontSize: '0.875rem',
              }}
              className={s.insumos__createInsumo__button__create}
            >
              Descontar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
