// Copyright 2021 Sean Slanec and Zoey Taylor
// This file is part of PogChat.

// PogChat is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.

// PogChat is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with PogChat.  If not, see <https://www.gnu.org/licenses/>.

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
  LightMode,
} from '@chakra-ui/react';
import clearStorage from 'utils/browser/clearStorage';

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
      <LightMode>
        <Button
          colorScheme="red"
          onClick={() => setIsOpen(true)}
          // variant="outline"
          width="100%"
        >
          Clear Data
        </Button>
      </LightMode>

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
              <LightMode>
                <Button colorScheme="red" onClick={onClear} ml={3}>
                  Yes, Clear My Data
                </Button>
              </LightMode>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
