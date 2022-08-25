function showPage(id) {
    for (let el of document.getElementsByClassName("page")) {
        el.hidden = true;
    }
    document.getElementById(id).hidden = false;
};


let stream = null;

async function startStream() {
    stream = await navigator.mediaDevices.getUserMedia({ video: { width: 500, height: 500 }, audio: false });
    document.getElementById("scan-video").srcObject = stream;
}

function stopStream() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });
        document.getElementById("scan-video").srcObject = null;
    }
}


document.getElementById("scan-btn").onclick = async() => {
    showPage("page-1");
    await startStream();
};

document.getElementById("back-btn").onclick = () => {
    showPage("page-0");
    stopStream();
};


// const barcodeDetector = new BarcodeDetector({
//     formats: [
//         'aztec',
//         'code_128',
//         'code_39',
//         'code_93',
//         'codabar',
//         'data_matrix',
//         'ean_13',
//         'ean_8',
//         'itf',
//         'pdf417',
//         'qr_code',
//         'upc_a',
//         'upc_e'
//     ]
// });

// try {
//     const barcodes = await barcodeDetector.detect(image);
//     barcodes.forEach(barcode => searchProductDatabase(barcode));
// } catch (e) {
//     console.error('Barcode detection failed:', e);
// }