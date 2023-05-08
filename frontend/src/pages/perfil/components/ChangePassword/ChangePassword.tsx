import { useAuthStore, useForm } from '@/hooks';
import {
  Button,
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
} from '@chakra-ui/react';
import React from 'react';
import { toast } from 'sonner';

function ChangePassword({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { currentUser, startUpdatePassword } = useAuthStore();

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

    //  Alert if passwords are not equal
    if (new_password !== comfirm_password) {
      toast.error('Las nuevas contraseñas no coinciden');
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <form onSubmit={handleSubmit} autoComplete="off">
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
            <Button onClick={handleCloseModal} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}

export default ChangePassword;
