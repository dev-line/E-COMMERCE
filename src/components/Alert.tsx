import Swal from "sweetalert2"

export function Loading() {
    Swal.fire({
        title: `Veuillez patienter ...`,
        timerProgressBar: true,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading()
        },
      })
}

export function Seccess() {
    Swal.fire({
        icon: 'success',
        title: 'Opération réussie',
        showConfirmButton: false,
        timer: 1500
      })
}

export function Oops() {
    Swal.fire({
        icon: 'error',
        title: 'Ooops ...',
        text: "Une erreur s'est produite lors de l'opération"
    })
}
