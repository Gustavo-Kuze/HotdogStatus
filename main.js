let firestore = firebase.firestore()
console.log(firestore)

function logError(msg, err) {
    alert(msg)
    console.log(err)
}

document.addEventListener('DOMContentLoaded', () => {
    const docRef = firestore.doc('samples/sandwichData')
    const btnSave = document.getElementById('btn-save')
    const input = document.getElementById('status-input')
    const output = document.getElementById('status-output')

    btnSave.addEventListener('click', () => {
        const text = input.value
        docRef.set({
            hotdogStatus: text
        }).then(() => {
            alert('Parabéns, o novo status foi salvo!')
        }).catch(err => {
            logError('Ocorreu um erro ao tentar salvar os dados D:, veja o console para mais detalhes...', err)
        })
    })

    function updateHotdogStatusOutput() {
        docRef.onSnapshot(doc => {
            if (doc && doc.exists)
                output.innerText = doc.data().hotdogStatus
        }).catch(err => {
            logError('Ocorreu um erro ao tentar ler os dados D:, veja o console para mais detalhes...', err)
        })
    }

    updateHotdogStatusOutput()
})
