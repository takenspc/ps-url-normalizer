import * as assert from 'assert';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';


function download(url: string, outPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const writeStream = fs.createWriteStream(outPath);

        // write
        writeStream.on('error', (err) => {
            console.error(err);
            console.error(err.stack);
            reject(err);
        });

        writeStream.on('finish', () => {
            resolve();
        });

        // request
        const request = https.get(url, (res) => {
            res.on('data', (data) => {
                writeStream.write(data);
            });

            res.on('end', () => {
                writeStream.end();
            });
        });

        request.on('error', (err) => {
            console.error(err);
            console.error(err.stack);
            reject(err);
        });
    });
}

export function update(): Promise<void> {
    const url = 'https://raw.githubusercontent.com/tobie/specref/master/refs/w3c.json';
    const jsonPath = path.join(__dirname, '..', 'rules', 'wd2ed', 'data', 'w3c.json');
    return download(url, jsonPath);
}
