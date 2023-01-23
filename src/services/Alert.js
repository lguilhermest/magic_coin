const { Alert } = require("react-native")

const defaultErrorMsg = "Um problema inesperado ocorreu."

const AlertService = new class {

  defaultAlertError() {
    return Alert.alert(
      "Erro",
      defaultErrorMsg
    )
  }

  errorMessage(error, message) {
    const responseError = error?.response?.data?.message ?? ""
    let customMessage = responseError.length > 0 ? responseError : defaultErrorMsg
    if (error?.response?.data?.message == "Unauthenticated") {
      return
    }
    return Alert.alert(
      "Oops...",
      message ?? customMessage
    )
  }

  infoMessage(message) {
    return Alert.alert(
      "Atenção",
      message
    )
  }

  successMessage(message) {
    return Alert.alert(
      "Sucesso",
      message
    )
  }

  alert(title, message) {
    return Alert.alert(
      title,
      message
    )
  }

  confirmAction({ title = "Atenção", message, confirmText = "Sim", onConfirmPress, cancelText = "Cancelar", onCancelPress, cancelable = true }) {
    return Alert.alert(
      title,
      message,
      [
        { text: confirmText, onPress: onConfirmPress },
        cancelable && { text: cancelText, style: "cancel", onPress: onCancelPress }
      ]
    )
  }
}

export default AlertService;