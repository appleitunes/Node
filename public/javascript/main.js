function httpCall(url) {
    return new Promise((resolve, reject) => {
        let xHTTP = new XMLHttpRequest();

        xHTTP.onreadystatechange = () => { 
            if (xHTTP.readyState == 4) {
                if (xHTTP.status == 200) {
                    resolve(xHTTP.responseText);
                }
                else {
                    reject("Error");
                }
            }
        }

        xHTTP.open("POST", url, true);
        xHTTP.send(null);
    });
}

function getData(keys, table, conditions="NULL") {
    keys = encodeURI(keys);
    table = encodeURI(table);
    conditions = encodeURI(conditions);

    return new Promise((resolve, reject) => {
        httpCall(`getData?keys=${keys}&table=${table}&conditions=${conditions}`)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}

function insertData(keys, values, table) {
    keys = encodeURI(keys);
    values = encodeURI(values);
    table = encodeURI(table);

    return new Promise((resolve, reject) => {
        httpCall(`insertData?keys=${keys}&values=${values}&table=${table}`)
        .then((data) => {
            if (data === "1") {
                resolve();
            }
            else {
                reject("Something went wrong.");
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
}