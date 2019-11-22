// function httpCall(url) {
//     return new Promise((resolve, reject) => {
//         let xHTTP = new XMLHttpRequest();

//         xHTTP.onreadystatechange = () => { 
//             if (xHTTP.readyState == 4) {
//                 if (xHTTP.status == 200) {
//                     resolve(xHTTP.responseText);
//                 }
//                 else {
//                     reject("Error");
//                 }
//             }
//         }

//         xHTTP.open("POST", url, true);
//         xHTTP.send(null);
//     });
// }

function httpCall(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
        })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
    });
}