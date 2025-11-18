import { openModal, closeModal } from '../modals/modalStore';
import { SuccessAlert } from './SuccessAlert';
import { ErrorAlert } from './ErrorAlert';
import { ConfirmationAlert } from './ConfirmationAlert';

const ALERT_IDS = {
  SUCCESS: 'grav-success-alert',
  ERROR: 'grav-error-alert',
  CONFIRMATION: 'grav-confirmation-alert',
};

/**
 * Muestra una alerta de éxito que se cierra automáticamente después de 1.5 segundos
 * @param title - Título de la alerta (por defecto: "Se guardó correctamente")
 */
export function showSuccessAlert(title?: string): void {
  const props = {
    title,
    onClose: () => closeModal(ALERT_IDS.SUCCESS),
  };

  openModal(ALERT_IDS.SUCCESS, SuccessAlert, props);
}

/**
 * Muestra una alerta de error con un botón OK para cerrar
 * @param title - Título de la alerta (por defecto: "Algo salió mal")
 */
export function showErrorAlert(title?: string): void {
  const props = {
    title,
    onClose: () => closeModal(ALERT_IDS.ERROR),
  };

  openModal(ALERT_IDS.ERROR, ErrorAlert, props);
}

/**
 * Muestra una alerta de confirmación con botones Sí/No
 * @param title - Título de la alerta (por defecto: "Confirmación")
 * @param message - Mensaje de la alerta (por defecto: "¿Desea guardar los cambios?")
 * @param callback - Función que se ejecuta al confirmar
 * @returns Promise que se resuelve cuando se confirma o cancela
 */
export function showConfirmationAlert(
  title?: string,
  message?: string,
  callback?: () => void
): Promise<boolean> {
  return new Promise((resolve) => {
    const handleConfirm = () => {
      closeModal(ALERT_IDS.CONFIRMATION);
      if (callback) {
        callback();
      }
      resolve(true);
    };

    const handleCancel = () => {
      closeModal(ALERT_IDS.CONFIRMATION);
      resolve(false);
    };

    const props = {
      title,
      message,
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    };

    openModal(ALERT_IDS.CONFIRMATION, ConfirmationAlert, props);
  });
}
