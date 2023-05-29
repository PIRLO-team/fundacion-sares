// Chakra UI
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

// Sonner notification
import { toast } from 'sonner';

// Hooks
import { useAuthStore, useForm } from '@/hooks';

// UI Local Components
import { Button } from '@/components/ui';

// Styles
import s from '../../styles/Perfil.module.scss';

function ChangePassword() {
  const { currentUser, startUpdatePassword } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    password,
    new_password,
    comfirm_password,
    onInputChange,
    onResetForm,
    formState,
  } = useForm({
    password: '',
    new_password: '',
    comfirm_password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Alert if input are empty
    if (password === '' || new_password === '' || comfirm_password === '') {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    // alert if password < 7 characters
    if (new_password.length < 7) {
      toast.error('La nueva contraseña debe tener al menos 7 caracteres');
      return;
    }

    await startUpdatePassword({
      user_id: currentUser?.uid as string,
      password,
      new_password,
      comfirm_password,
    });

    onClose();
  };

  const handleCloseModal = () => {
    onResetForm();
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className={s.profile__personalInfo__form__group__button__item}
      >
        Cambiar contraseña
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        >
          <ModalContent>
            <ModalHeader>Actualiza tu contraseña</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Contraseña actual</FormLabel>
                <Input
                  required
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  placeholder="Contraseña actual"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Nueva contraseña</FormLabel>
                <Input
                  required
                  name="new_password"
                  value={new_password}
                  onChange={onInputChange}
                  placeholder="Nueva contraseña"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Confirmar nueva contraseña</FormLabel>
                <Input
                  required
                  name="comfirm_password"
                  value={comfirm_password}
                  onChange={onInputChange}
                  placeholder="Confirmar nueva contraseña"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={handleCloseModal}
                className={
                  s.profile__personalInfo__form__group__button__item__cancel
                }
                style={{
                  marginRight: '1rem',
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={
                  s.profile__personalInfo__form__group__button__item__create
                }
              >
                Guardar
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default ChangePassword;
