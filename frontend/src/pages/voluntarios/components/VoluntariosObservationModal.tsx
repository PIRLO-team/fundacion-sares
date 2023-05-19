// React
import { useEffect, useState } from 'react';

// Chakra UI
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';

// Sonner notification
import { toast } from 'sonner';

// hooks
import { useVoluntariosStore } from '@/hooks';

// UI Local Components
import { Button } from '@/components/ui';

// Styles
import s from '../styles/Voluntarios.module.scss';

// Types
import { TVoluntario } from '@/utils/types';

export default function VoluntariosObservationModal({
  isOpen,
  onClose,
  voluntario,
  setVoluntario,
}: {
  isOpen: boolean;
  onClose: () => void;
  voluntario: TVoluntario | null;
  setVoluntario: React.Dispatch<React.SetStateAction<TVoluntario | null>>;
}) {
  const { startSavingVoluntario, startLoadingVoluntarios } =
    useVoluntariosStore();

  const [formState, setFormState] = useState({
    observation: '',
  });

  // OnInputChange
  const onInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.observation === '') {
      toast.error('La observación es obligatoria');
      return;
    }

    await startSavingVoluntario(formState);
    await startLoadingVoluntarios();

    onClose();
  };

  useEffect(() => {
    if (voluntario !== null) {
      setFormState(voluntario as TVoluntario);
    }
  }, [voluntario]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setVoluntario(null);
      }}
      isCentered
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Realizar observaciones</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              name="observation"
              value={formState?.observation ?? ''}
              onChange={onInputChange}
              placeholder="Observaciones"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              style={{
                marginRight: '1rem',
                fontSize: '0.875rem',
              }}
              onClick={() => {
                onClose();
                setVoluntario(null);
              }}
              className={s.voluntarios__createVoluntario__button__cancel}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              style={{
                fontSize: '0.875rem',
              }}
              className={s.voluntarios__createVoluntario__button__create}
            >
              Guardar observación
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
