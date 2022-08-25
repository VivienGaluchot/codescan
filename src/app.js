function showPage(id) {
    for (let el of document.getElementsByClassName("page")) {
        el.hidden = true;
    }
    document.getElementById(id).hidden = false;
};

let qrScanner = null;

async function startStream() {
    stream = await navigator.mediaDevices.getUserMedia({ video: { width: 500, height: 500 }, audio: false });
    document.getElementById("scan-video").srcObject = stream;

    qrScanner = new QrScanner(
        document.getElementById("scan-video"),
        (result) => {
            console.log('decoded qr code:', result);
            showPage("page-0");
            stopStream();
        }, { highlightScanRegion: true },
    );
    qrScanner.start();
}

function stopStream() {
    qrScanner.stop();
    qrScanner.destroy();
    qrScanner = null;
}


document.getElementById("scan-btn").onclick = async() => {
    showPage("page-1");
    await startStream();
};

document.getElementById("back-btn").onclick = () => {
    showPage("page-0");
    stopStream();
};