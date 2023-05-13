// React
import { FormEvent, useRef, useState } from 'react';

// Next
import Image from 'next/image';
import { useRouter } from 'next/router';

// AWS
import S3 from 'aws-sdk/clients/s3';

// Chakra UI
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

// Hooks
import { useUsersStore } from '@/hooks';

// Sonner Notificacitions
import { toast } from 'sonner';

// Styles
import s from './ChangeAvatarModal.module.scss';

const s3 = new S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
});

export const ChangeAvatarModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // Hooks
  const { activeUser, startSavingUser, startGetUserById } = useUsersStore();

  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Router
  const router = useRouter();
  const userID = router.query.id;

  // Ref
  const fileInput = useRef<HTMLInputElement>(null);

  // onFileInputChange
  const onFileInputChange = async (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;

    if (!files) return;

    // Only allow images
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(files[0]?.name)) {
      toast.error('Solo se permiten archivos de imagen');
      return;
    }

    // do not allow file with size > 2MB
    const filesSize = files[0]?.size / 1024 / 1024;
    if (filesSize > 2) {
      toast.error('El tamaño del archivo no puede ser mayor a 2MB');
      return;
    }

    const lastImage = activeUser?.img_profile?.split('/').pop();
    const fileName = files[0]?.name;

    if (lastImage === fileName) {
      toast.error('La imagen seleccionada es la misma que la actual');
      return;
    }

    setSelectedFile(files[0]);
  };

  // handleUpload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Por favor selecciona un archivo para subir');
      return;
    }

    const fileName = selectedFile.name;

    const params = {
      Bucket: `saresapp/${activeUser?.user_id}`,
      Key: fileName,
      Body: selectedFile,
      ContentType: selectedFile.type,
      // ACL: 'public-read',
    };

    try {
      await s3.putObject(params).promise();

      const url = `https://saresapp.s3-us-west-1.amazonaws.com/${activeUser?.user_id}/${fileName}`;

      await startSavingUser({
        user_id: activeUser?.user_id,
        img_profile: url,
      });

      await startGetUserById(userID as string);

      onClose();

      toast.success('Imagen de perfil actualizada');
    } catch (error) {
      console.error(error);

      toast.error('Error al subir la imagen');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cambio de imagen de perfil</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className={s.fileModal}>
            <input
              type="file"
              name="file"
              ref={fileInput}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={onFileInputChange}
            />

            <div
              className={s.fileModal__group}
              onClick={() => {
                fileInput.current?.click();
              }}
            >
              <div className={s.fileModal__group__icon}>
                <Image
                  src="/icons/Globals/upload.svg"
                  alt="Upload images"
                  width={25}
                  height={25}
                />
              </div>

              <div>
                <p className={s.fileModal__group__text}>
                  Selecciona los archivos y súbelos.
                </p>
                <p className={s.fileModal__group__subText}>
                  PNG, JPG, JPEG (Max 2 MB)
                </p>
              </div>
            </div>
            {selectedFile && (
              <div className={s.fileModal__group__file}>
                <p>{selectedFile.name}</p>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleUpload}>
            Actualizar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
