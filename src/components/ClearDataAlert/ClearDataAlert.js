import { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
} from '@chakra-ui/react';
import clearStorage from '../../utils/browser/clearStorage';

export default function ClearDataAlert(props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const onClear = () => {
    clearStorage();
    window.open(process.env.REACT_APP_REDIRECT_URL, '_self');
  };

  return (
    <Box {...props}>
      <Button
        colorScheme="red"
        onClick={() => setIsOpen(true)}
        variant="outline"
        width="100%"
      >
        Clear Data
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Clear Data
            </AlertDialogHeader>

            <AlertDialogBody>
              This will clear your app settings and log you out. Are you sure?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No, Take Me Back
              </Button>
              <Button colorScheme="red" onClick={onClear} ml={3}>
                Yes, Clear My Data
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
