const information = document.getElementById('info')
information.innerHTML = `This app is using chrome version: ${window.versions.chrome()}, \
    Node.js (v${versions.node()}), and electron version: ${window.versions.electron()}`